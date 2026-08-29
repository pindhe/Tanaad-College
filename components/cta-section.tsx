import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title,
  description,
  actionLabel,
  href = "/apply",
}: {
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
}) {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">{description}</p>
        <Button asChild variant="gold" size="lg" className="mt-8">
          <Link href={href}>{actionLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
