import { EventCard } from "@/components/event-card";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Events",
  description: "Upcoming and past events at Tanaad College.",
  path: "/events",
});

export default async function EventsPage() {
  const now = new Date();
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { eventDate: "asc" },
  });
  const upcoming = events.filter((item) => item.eventDate >= now);
  const past = events.filter((item) => item.eventDate < now);

  return (
    <>
      <PageHeader title="Events" description="Stay informed about college gatherings and activities." />
      <Section>
        <h2 className="mb-6 text-2xl">Upcoming Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
        {upcoming.length === 0 ? <p className="text-muted-foreground">No upcoming events are published yet.</p> : null}
      </Section>
      <Section className="bg-muted/40">
        <h2 className="mb-6 text-2xl">Past Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </Section>
    </>
  );
}
