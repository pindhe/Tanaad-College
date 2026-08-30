import { PageHeader } from "@/components/page-header";
import { ProgramCard } from "@/components/program-card";
import { Section } from "@/components/section";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedPrograms } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Programs",
  description: "Explore academic programs available at Tanaad College.",
  path: "/programs",
});

export default async function ProgramsPage() {
  const [programs, locale] = await Promise.all([
    getPublishedPrograms(),
    getLocale(),
  ]);
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHeader title="Academic Programs" description="Browse published programs, departments, and faculties." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} actionLabel={dictionary.common.learnMore} />
          ))}
        </div>
        {programs.length === 0 ? <p className="text-muted-foreground">No published programs are available yet.</p> : null}
      </Section>
    </>
  );
}
