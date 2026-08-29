"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryCategory } from "@prisma/client";

const CATEGORIES: Array<GalleryCategory | "ALL"> = [
  "ALL",
  "CAMPUS",
  "CLASSROOMS",
  "LABORATORIES",
  "STUDENTS",
  "GRADUATION",
  "EVENTS",
  "SPORTS",
];

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  category: GalleryCategory;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<GalleryCategory | "ALL">("ALL");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (category === "ALL" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              category === item ? "bg-primary text-white" : "bg-muted text-foreground"
            }`}
          >
            {item === "ALL" ? "All" : item.charAt(0) + item.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <motion.button
            layout
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-navy/70 px-3 py-2 text-start text-sm text-white">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActive(null)}
          >
            <button type="button" className="absolute end-5 top-5 text-white" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[80vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <Image src={active.image} alt={active.title} fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
