"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";

const CAMPUS_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80";

export function Hero({
  title,
  description,
  image,
  dictionary,
}: {
  title: string;
  description: string;
  image: string | null;
  dictionary: Dictionary;
}) {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-navy text-white">
      <Image
        src={image || CAMPUS_IMAGE}
        alt="Students and campus at Tanaad College"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg text-white/85"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild variant="gold" size="lg">
            <Link href="/apply">{dictionary.hero.apply}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
            <Link href="/programs">{dictionary.hero.explore}</Link>
          </Button>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-white/80"
        >
          <li>{dictionary.hero.quality}</li>
          <li>{dictionary.hero.lecturers}</li>
          <li>{dictionary.hero.studentFocused}</li>
        </motion.ul>
      </div>
    </section>
  );
}
