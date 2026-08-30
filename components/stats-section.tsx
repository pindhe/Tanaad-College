"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Laptop, MapPin, Users } from "lucide-react";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target <= 0) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Stat({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl text-secondary">{count.toLocaleString()}+</p>
      <p className="mt-2 text-sm font-medium text-white/80">{label}</p>
    </div>
  );
}

const highlights = [
  { label: "Location", value: "Hargeisa", icon: MapPin },
  { label: "Specialization", value: "IT & Technology", icon: Laptop },
  { label: "Programs", value: "ICT & Digital Skills", icon: GraduationCap },
  { label: "Community", value: "Student-Focused", icon: Users },
];

export function StatsSection({
  students,
  lecturers,
  programs,
  years,
}: {
  students: number;
  lecturers: number;
  programs: number;
  years: number;
}) {
  const stats = [
    { label: "Students", value: students },
    { label: "Qualified Lecturers", value: lecturers },
    { label: "Campus Faculties", value: programs },
    { label: "Years of Excellence", value: years },
  ].filter((item) => item.value > 0);

  if (stats.length === 0) {
    return (
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-2 lg:grid-cols-4 sm:divide-x sm:divide-y-0">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-6 py-6 sm:px-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-semibold text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary py-14 text-white">
      <div className={`mx-auto grid max-w-6xl gap-8 px-4 grid-cols-2 ${stats.length >= 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {stats.map((item) => (
          <Stat key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}
