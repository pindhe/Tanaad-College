import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "News",
  description: "Latest news and announcements from Tanaad College.",
  path: "/news",
});

export default async function NewsPage() {
  const items = await prisma.news.findMany({
    where: { published: true, publishedAt: { lte: new Date() } },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHeader title="News" description="College announcements and stories." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        {items.length === 0 ? <p className="text-muted-foreground">No published news is available yet.</p> : null}
      </Section>
    </>
  );
}
