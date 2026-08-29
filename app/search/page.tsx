import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SearchForm } from "@/components/search-form";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search programs, news, events, and faculty at Tanaad College.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const [programs, news, events, staff] = query
    ? await Promise.all([
        prisma.program.findMany({
          where: { published: true, OR: [{ name: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] },
          take: 8,
        }),
        prisma.news.findMany({
          where: { published: true, OR: [{ title: { contains: query, mode: "insensitive" } }, { excerpt: { contains: query, mode: "insensitive" } }] },
          take: 8,
        }),
        prisma.event.findMany({
          where: { published: true, OR: [{ title: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] },
          take: 8,
        }),
        prisma.staff.findMany({
          where: { published: true, OR: [{ name: { contains: query, mode: "insensitive" } }, { position: { contains: query, mode: "insensitive" } }] },
          take: 8,
        }),
      ])
    : [[], [], [], []];

  return (
    <>
      <PageHeader title="Search" description="Find programs, news, events, and faculty." />
      <Section>
        <SearchForm defaultValue={query} placeholder="Search programs, news, events, faculty" />
        {query ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ResultGroup title="Programs" items={programs.map((item) => ({ href: `/programs/${item.slug}`, label: item.name }))} />
            <ResultGroup title="News" items={news.map((item) => ({ href: `/news/${item.slug}`, label: item.title }))} />
            <ResultGroup title="Events" items={events.map((item) => ({ href: "/events", label: item.title }))} />
            <ResultGroup title="Faculty" items={staff.map((item) => ({ href: "/faculty", label: item.name }))} />
          </div>
        ) : (
          <p className="mt-6 text-muted-foreground">Enter a search term to begin.</p>
        )}
      </Section>
    </>
  );
}

function ResultGroup({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link href={item.href} className="text-primary hover:underline">{item.label}</Link>
          </li>
        ))}
      </ul>
      {items.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">No matches.</p> : null}
    </div>
  );
}
