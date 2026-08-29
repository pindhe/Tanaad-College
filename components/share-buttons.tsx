"use client";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <a
        className="rounded-md border px-3 py-1.5 hover:bg-muted"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <a
        className="rounded-md border px-3 py-1.5 hover:bg-muted"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <a
        className="rounded-md border px-3 py-1.5 hover:bg-muted"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}
