import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { EventCardData } from "@/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80";

export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-44">
        <Image src={event.image || FALLBACK} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-lg">{event.title}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(event.eventDate)}</li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.eventTime}</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</li>
        </ul>
        {event.registrationLink ? (
          <a href={event.registrationLink} className="text-sm font-semibold text-primary" target="_blank" rel="noreferrer">
            Register
          </a>
        ) : null}
      </div>
    </article>
  );
}
