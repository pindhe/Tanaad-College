import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getProgramBySlug } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { parseLines } from "@/lib/utils";
import { safeQuery } from "@/lib/safe";

const FALLBACK =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await safeQuery(() => prisma.program.findUnique({ where: { slug } }), null);
  if (!program) return {};
  return buildMetadata({
    title: program.name,
    description: program.description,
    path: `/programs/${program.slug}`,
    image: program.image,
  });
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.name,
    description: program.description,
    provider: { "@type": "CollegeOrUniversity", name: "Tanaad College" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-72 bg-navy">
        <Image src={program.image || FALLBACK} alt={program.name} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 text-white sm:px-6">
            <p className="text-sm text-secondary">{program.department.faculty.name} · {program.department.name}</p>
            <h1 className="mt-2 text-4xl">{program.name}</h1>
          </div>
        </div>
      </section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <Block title="Overview" text={program.overview || program.description} />
            <List title="Entry requirements" items={parseLines(program.requirements)} />
            <List title="Courses" items={parseLines(program.courses)} />
            <List title="Learning outcomes" items={parseLines(program.learningOutcomes)} />
            <List title="Career opportunities" items={parseLines(program.careerOpportunities)} />
          </div>
          <aside className="h-fit rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-semibold">{program.duration}</p>
            <p className="mt-4 text-sm text-muted-foreground">Tuition</p>
            <p className="font-semibold">{program.tuition}</p>
            <p className="mt-4 text-sm text-muted-foreground">Department</p>
            <p className="font-semibold">{program.department.name}</p>
            <Button asChild className="mt-6 w-full" variant="gold">
              <Link href={`/apply?program=${program.id}`}>Apply for This Program</Link>
            </Button>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 ps-5 text-muted-foreground">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
