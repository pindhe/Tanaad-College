import { PageHeader } from "@/components/page-header";
import { FacultyCard } from "@/components/faculty-card";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  return buildMetadata({
    title: "About",
    description: "Learn about Tanaad College, its history, vision, mission, and leadership.",
    path: "/about",
  });
}

const values = ["Excellence", "Integrity", "Innovation", "Leadership", "Responsibility", "Service"];

export default async function AboutPage() {
  const [settings, leaders] = await Promise.all([
    getSettings(),
    prisma.staff.findMany({
      where: { published: true, isLeadership: true },
      include: { department: { include: { faculty: true } } },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return (
    <>
      <PageHeader title="About Tanaad College" description={settings.aboutText} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Our History</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{settings.historyText}</p>
          </div>
          <ol className="space-y-4 border-s-2 border-primary/20 ps-6">
            <li>
              <p className="text-sm font-semibold text-primary">Foundation</p>
              <p className="text-muted-foreground">The college was established to serve students seeking quality higher education.</p>
            </li>
            <li>
              <p className="text-sm font-semibold text-primary">Growth</p>
              <p className="text-muted-foreground">Academic programs and student services continue to be developed through the admin-managed content.</p>
            </li>
            <li>
              <p className="text-sm font-semibold text-primary">Today</p>
              <p className="text-muted-foreground">Tanaad College welcomes applicants through a structured online admission process.</p>
            </li>
          </ol>
        </div>
      </Section>
      <Section className="bg-muted/40">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border bg-white p-8">
            <h2 className="text-2xl">Vision</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{settings.vision}</p>
          </article>
          <article className="rounded-xl border bg-white p-8">
            <h2 className="text-2xl">Mission</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{settings.mission}</p>
          </article>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl">Core Values</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article key={value} className="rounded-xl border bg-white p-6">
              <h3 className="text-lg">{value}</h3>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-muted/40">
        <h2 className="mb-8 text-3xl">Leadership</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leaders.map((person) => (
            <FacultyCard key={person.id} person={person} />
          ))}
        </div>
        {leaders.length === 0 ? <p className="text-muted-foreground">Leadership profiles are managed from the admin dashboard.</p> : null}
      </Section>
    </>
  );
}
