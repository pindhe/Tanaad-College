import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ProgramCardData } from "@/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80";

export function ProgramCard({ program, actionLabel }: { program: ProgramCardData; actionLabel: string }) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48">
        <Image
          src={program.image || FALLBACK}
          alt={program.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {program.department.faculty.name} · {program.department.name}
        </p>
        <h3 className="text-lg">{program.name}</h3>
        <p className="text-sm text-muted-foreground">{program.duration}</p>
        <p className="line-clamp-3 text-sm text-muted-foreground">{program.description}</p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/programs/${program.slug}`}>{actionLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
