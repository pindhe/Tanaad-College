import Image from "next/image";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/news-card";
import { Section } from "@/components/section";
import { ShareButtons } from "@/components/share-buttons";
import { buildMetadata } from "@/lib/metadata";
import { getNewsBySlug, getRelatedNews } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe";
import { absoluteUrl, formatDate } from "@/lib/utils";

const FALLBACK =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await safeQuery(() => prisma.news.findUnique({ where: { slug } }), null);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.slug}`,
    image: item.featuredImage,
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const related = await getRelatedNews(item.id, item.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.publishedAt,
    author: item.author.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <div className="relative h-80 bg-navy">
          <Image src={item.featuredImage || FALLBACK} alt={item.title} fill className="object-cover opacity-50" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-4 pb-10 text-white">
              <p className="text-sm text-secondary">{item.category}</p>
              <h1 className="mt-2 text-4xl">{item.title}</h1>
              <p className="mt-3 text-sm text-white/80">
                {item.author.name}
                {item.publishedAt ? ` · ${formatDate(item.publishedAt)}` : ""}
              </p>
            </div>
          </div>
        </div>
        <Section>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="whitespace-pre-wrap leading-8 text-muted-foreground">{item.content}</div>
            <ShareButtons title={item.title} url={absoluteUrl(`/news/${item.slug}`)} />
          </div>
        </Section>
      </article>
      {related.length > 0 ? (
        <Section className="bg-muted/40">
          <h2 className="mb-8 text-2xl">Related news</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((newsItem) => (
              <NewsCard key={newsItem.id} item={newsItem} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
