"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryCategory } from "@prisma/client";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/gallery-fallback";

export type { GalleryItem };

const CATEGORY_LABELS: Record<GalleryCategory | "ALL", string> = {
  ALL: "All",
  CAMPUS: "Campus",
  CLASSROOMS: "Classrooms",
  LABORATORIES: "Laboratories",
  STUDENTS: "Students",
  GRADUATION: "Graduation",
  EVENTS: "Campus life",
  SPORTS: "Sports",
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const availableCategories = useMemo(() => {
    const present = new Set(items.map((item) => item.category));
    return (["ALL", ...Object.keys(CATEGORY_LABELS).filter((key) => key !== "ALL" && present.has(key as GalleryCategory))] as Array<
      GalleryCategory | "ALL"
    >);
  }, [items]);

  const [category, setCategory] = useState<GalleryCategory | "ALL">("ALL");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "ALL" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  const active = activeIndex !== null ? filtered[activeIndex] ?? null : null;

  useEffect(() => {
    setActiveIndex(null);
  }, [category]);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? null : (current + 1) % filtered.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + filtered.length) % filtered.length,
        );
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, filtered.length]);

  if (items.length === 0) {
    return <p className="text-muted-foreground">Gallery photos will appear here once published.</p>;
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4">
        {availableCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "relative pb-3 text-sm font-semibold transition-colors",
              category === item ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            {CATEGORY_LABELS[item]}
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-secondary transition-opacity",
                category === item ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, index) => (
          <motion.button
            layout
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-90 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-start text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                  {CATEGORY_LABELS[item.category]}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug sm:text-base">{item.title}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No photos in this category yet.</p>
      ) : null}

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0903]/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              className="absolute end-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close"
              onClick={() => setActiveIndex(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {filtered.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute start-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:start-8"
                  aria-label="Previous photo"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) =>
                      current === null ? null : (current - 1 + filtered.length) % filtered.length,
                    );
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="absolute end-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:end-8"
                  aria-label="Next photo"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) => (current === null ? null : (current + 1) % filtered.length));
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            ) : null}

            <div
              className="relative flex h-[min(80vh,720px)] w-full max-w-5xl flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative min-h-0 flex-1">
                <Image src={active.image} alt={active.title} fill className="object-contain" sizes="100vw" />
              </div>
              <div className="mt-4 text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                  {CATEGORY_LABELS[active.category]}
                </p>
                <p className="mt-1 text-lg font-semibold">{active.title}</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
