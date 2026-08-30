"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { CollegeLogo } from "@/components/college-logo";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

export const HERO_SLIDES = [
  "/images/imgs/790683925_1817997656442489_4589591040991255365_n.jpg",
  "/images/imgs/788438777_1601342111350353_4685942073999015040_n.jpg",
  "/images/imgs/502997519_1408768317365427_6447797780186284108_n.jpg",
  "/images/imgs/500379155_1405416951033897_5714435640946410489_n.jpg",
] as const;

const SLIDE_INTERVAL_MS = 5000;

function HeroSlideshow({ className, sizes }: { className?: string; sizes: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={HERO_SLIDES[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[index]}
            alt="Tanaad College campus and graduation"
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes={sizes}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 lg:bottom-6">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}`}
            onClick={() => setIndex(slideIndex)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              slideIndex === index ? "w-7 bg-secondary" : "w-1.5 bg-white/60 hover:bg-white",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero({
  title,
  description,
  dictionary,
  logo,
}: {
  title: string;
  description: string;
  dictionary: Dictionary;
  logo?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F7F8FC]">
      <HeroSlideshow className="absolute inset-y-0 end-0 hidden w-[58%] lg:block" sizes="58vw" />

      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background: [
            "linear-gradient(90deg, rgba(1,220,2,0.12) 0%, rgba(12,1,155,0.06) 6%, rgba(247,248,252,0) 14%)",
            "linear-gradient(90deg, #F7F8FC 0%, #F7F8FC 28%, rgba(247,248,252,0.98) 38%, rgba(247,248,252,0.88) 46%, rgba(247,248,252,0.62) 54%, rgba(247,248,252,0.28) 62%, rgba(247,248,252,0.08) 70%, transparent 78%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto max-w-7xl lg:min-h-[calc(100vh-7.5rem)]">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:max-w-[52%] lg:px-12 lg:py-20 xl:px-16">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <CollegeLogo src={logo} size="md" />
            <p className="text-sm font-semibold text-primary">Center of Leading IT & Technology</p>
          </div>

          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm">
            <GraduationCap className="h-3.5 w-3.5 text-secondary" />
            Leading Technology
          </p>

          <h1 className="mt-6 max-w-xl font-heading text-[2.1rem] font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]">
            {title}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/faculty"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              {dictionary.nav.faculty}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-full border border-border bg-white/90 px-7 text-sm font-semibold text-primary backdrop-blur-sm transition hover:border-primary"
            >
              {dictionary.nav.about}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-border bg-white/90 px-7 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-primary hover:text-primary"
            >
              {dictionary.nav.contact}
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[dictionary.hero.quality, dictionary.hero.lecturers, dictionary.hero.studentFocused].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border/80 bg-white/90 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
              >
                <span className="mb-2 block h-1 w-8 rounded-full bg-secondary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:hidden">
          <HeroSlideshow className="absolute inset-0" sizes="100vw" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #F7F8FC 0%, rgba(247,248,252,0.55) 22%, rgba(247,248,252,0.15) 42%, transparent 58%)",
            }}
          />
        </div>

        <div className="absolute inset-x-5 bottom-6 sm:inset-x-8 lg:inset-x-auto lg:end-8 lg:bottom-10 lg:max-w-xs">
          <div className="rounded-2xl border border-white/25 bg-primary/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
            <div className="flex items-start gap-3 text-white">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Hargeisa</p>
                <p className="mt-1 text-base font-semibold">Near Telesom Headquarters</p>
                <p className="mt-2 text-sm text-white/80">Practical ICT education for today&apos;s digital careers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
