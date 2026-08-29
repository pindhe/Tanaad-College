import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/settings";
import type { StudentLifeContent } from "@/types";

export const metadata = buildMetadata({
  title: "Student Life",
  description: "Campus life, clubs, sports, events, and student activities at Tanaad College.",
  path: "/student-life",
});

const defaults: StudentLifeContent = {
  campusLife: "Campus life at Tanaad College is designed around study, community, and student support.",
  clubs: "Student clubs are introduced and updated through college communications and the admin dashboard.",
  sports: "Sports and recreation opportunities are shared as they are scheduled by the college.",
  events: "Student events appear on the public events calendar when published by administrators.",
  activities: "Academic and extracurricular activities are organized throughout the year.",
  communityService: "Community service opportunities are announced by the college when available.",
};

export default async function StudentLifePage() {
  const settings = await getSettings();
  let content = defaults;
  try {
    content = { ...defaults, ...(JSON.parse(settings.studentLifeContent) as Partial<StudentLifeContent>) };
  } catch {
    content = defaults;
  }

  const cards = [
    { title: "Campus Life", text: content.campusLife },
    { title: "Student Clubs", text: content.clubs },
    { title: "Sports", text: content.sports },
    { title: "Events", text: content.events },
    { title: "Activities", text: content.activities },
    { title: "Community Service", text: content.communityService },
  ];

  return (
    <>
      <PageHeader title="Student Life" description="A closer look at campus community and student activities." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl">{card.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{card.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
