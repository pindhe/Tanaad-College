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
  "/images/imgs/11.jpg",
  "/images/imgs/2.jpg",
  "/images/imgs/3.jpg",
  "/images/imgs/14.jpeg",
] as const;

const SLIDE_INTERVAL_MS = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.4,
  }),
};

const mobileStagger = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

function HeroSlideshow({
  className,
  sizes,
  dotClassName,
}: {
  className?: string;
  sizes: string;
  dotClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = (nextIndex: number) => {
    setDirection(nextIndex > index || (index === HERO_SLIDES.length - 1 && nextIndex === 0) ? 1 : -1);
    setIndex(nextIndex);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={HERO_SLIDES[index]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[index]}
            alt={`Tanaad College slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes={sizes}
          />
        </motion.div>
      </AnimatePresence>

      <div className={cn("absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2 lg:bottom-6", dotClassName)}>
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}`}
            onClick={() => goToSlide(slideIndex)}
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

function HeroHighlights({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-border/80 bg-white/90 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
        >
          <span className="mb-2 block h-1 w-8 rounded-full bg-secondary" />
          {item}
        </div>
      ))}
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
  const highlights = [dictionary.hero.quality, dictionary.hero.lecturers, dictionary.hero.studentFocused];

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

      {/* Mobile — full-bleed slideshow with centered overlay text */}
      <div className="relative min-h-[min(88vh,760px)] lg:hidden">
        <HeroSlideshow className="absolute inset-0" sizes="100vw" dotClassName="bottom-6" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,1,155,0.82) 0%, rgba(12,1,155,0.68) 45%, rgba(12,1,155,0.88) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-[min(88vh,760px)] flex-col items-center justify-center px-5 pb-16 pt-20 text-center sm:px-8">
          <motion.div
            {...mobileStagger}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-6 flex flex-col items-center gap-3"
          >
            <CollegeLogo src={logo} size="lg" />
            <p className="text-sm font-semibold text-secondary">Center of Leading IT & Technology</p>
          </motion.div>

          <motion.p
            {...mobileStagger}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          >
            <GraduationCap className="h-3.5 w-3.5 text-secondary" />
            Leading Technology
          </motion.p>

          <motion.h1
            {...mobileStagger}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-md font-heading text-[2rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.35rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            {...mobileStagger}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-4 max-w-sm text-base leading-7 text-white/85"
          >
            {description}
          </motion.p>

          <motion.div
            {...mobileStagger}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/faculty"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-primary shadow-lg transition hover:bg-secondary/90"
            >
              {dictionary.nav.faculty}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {dictionary.nav.about}
            </Link>
          </motion.div>

          <motion.div
            {...mobileStagger}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-8 inline-flex max-w-xs items-start gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left backdrop-blur-md"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">Hargeisa</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Near Telesom Headquarters</p>
              <p className="mt-1 text-xs leading-5 text-white/75">Practical ICT education for today&apos;s digital careers.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile highlights — below hero */}
      <div className="px-5 py-8 sm:px-8 lg:hidden">
        <HeroHighlights items={highlights} />
      </div>

      {/* Desktop — split layout */}
      <div className="relative mx-auto hidden max-w-7xl lg:block lg:min-h-[calc(100vh-7.5rem)]">
        <div className="flex max-w-[52%] flex-col justify-center px-12 py-20 xl:px-16">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm">
            <GraduationCap className="h-3.5 w-3.5 text-secondary" />
            Leading Technology
          </p>

          <h1 className="mt-6 max-w-xl font-heading text-[3.15rem] font-bold leading-[1.12] tracking-tight text-foreground">
            {title}
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-7 text-muted-foreground">{description}</p>

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

          <div className="mt-10">
            <HeroHighlights items={highlights} />
          </div>
        </div>

        <div className="absolute end-8 bottom-10 z-20 max-w-xs">
          <div className="rounded-2xl border border-white/25 bg-primary/90 p-6 shadow-xl backdrop-blur-md">
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
