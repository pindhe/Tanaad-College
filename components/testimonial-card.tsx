import Image from "next/image";
import { Star } from "lucide-react";
import type { TestimonialData } from "@/types";

export function TestimonialCard({ item }: { item: TestimonialData }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
          {item.photo ? (
            <Image src={item.photo} alt={item.studentName} fill className="object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
              {item.studentName.slice(0, 1)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-base">{item.studentName}</h3>
          <p className="text-xs text-muted-foreground">
            {item.program} · {item.graduationYear}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5 text-secondary" aria-label={`${item.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={`h-4 w-4 ${index < item.rating ? "fill-current" : "opacity-30"}`} />
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.content}</p>
    </article>
  );
}
