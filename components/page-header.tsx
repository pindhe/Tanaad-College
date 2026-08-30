import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description?: string;
  image?: string | null;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-primary text-white", className)}>
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(12,1,155,0.92) 0%, rgba(12,1,155,0.78) 42%, rgba(12,1,155,0.45) 100%)",
            }}
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Tanaad College</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
