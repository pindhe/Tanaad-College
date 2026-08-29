"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
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
  return (
    <section className="bg-navy py-14 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        <Stat label="Students" value={students} />
        <Stat label="Qualified Lecturers" value={lecturers} />
        <Stat label="Academic Programs" value={programs} />
        <Stat label="Years of Excellence" value={years} />
      </div>
    </section>
  );
}
