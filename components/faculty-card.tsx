import Image from "next/image";
import type { StaffCardData } from "@/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80";

export function FacultyCard({ person }: { person: StaffCardData }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-56">
        <Image src={person.photo || FALLBACK} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg">{person.name}</h3>
        <p className="text-sm font-medium text-primary">{person.position}</p>
        {person.department ? (
          <p className="text-xs text-muted-foreground">{person.department.name}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">{person.qualification}</p>
        <p className="line-clamp-4 text-sm text-muted-foreground">{person.biography}</p>
      </div>
    </article>
  );
}
