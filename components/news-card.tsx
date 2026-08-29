import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatShortDate } from "@/lib/utils";
import type { NewsCardData } from "@/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80";

export function NewsCard({ item }: { item: NewsCardData }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/news/${item.slug}`} className="block">
        <div className="relative h-48">
          <Image src={item.featuredImage || FALLBACK} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="space-y-3 p-5">
          <Badge>{item.category}</Badge>
          <h3 className="text-lg leading-snug">{item.title}</h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
          <p className="text-xs text-muted-foreground">
            {item.author.name}
            {item.publishedAt ? ` · ${formatShortDate(item.publishedAt)}` : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
