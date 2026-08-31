"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, MapPin } from "lucide-react";
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
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const mobileStagger = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

function useHeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const bumpProgress = useCallback(() => setProgressKey((k) => k + 1), []);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + HERO_SLIDES.length) % HERO_SLIDES.length);
      bumpProgress();
    },
    [bumpProgress],
  );

  const goNext = useCallback(() => goToSlide(index + 1), [goToSlide, index]);
  const goPrev = useCallback(() => goToSlide(index - 1), [goToSlide, index]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
      bumpProgress();
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, bumpProgress]);

  return { index, progressKey, paused, setPaused, goToSlide, goNext, goPrev };
}

function HeroSlideDots({
  index,
  goToSlide,
  className,
  variant = "light",
}: {
  index: number;
  goToSlide: (next: number) => void;
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {HERO_SLIDES.map((slide, slideIndex) => (
        <button
          key={slide}
          type="button"
          aria-label={`Show slide ${slideIndex + 1}`}
          aria-current={slideIndex === index ? "true" : undefined}
          onClick={() => goToSlide(slideIndex)}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            slideIndex === index
              ? cn("w-8", variant === "light" ? "bg-secondary" : "bg-secondary")
              : cn("w-1.5", variant === "light" ? "bg-primary/20 hover:bg-primary/35" : "bg-white/45 hover:bg-white/70"),
          )}
        />
      ))}
    </div>
  );
}

function HeroSlideProgress({ progressKey, variant = "light" }: { progressKey: number; variant?: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "h-0.5 w-full overflow-hidden rounded-full",
        variant === "light" ? "bg-primary/10" : "bg-white/20",
      )}
    >
      <motion.div
        key={progressKey}
        className={cn("h-full rounded-full", variant === "light" ? "bg-secondary" : "bg-secondary")}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: "linear" }}
      />
    </div>
  );
}

function HeroSlideImage({
  index,
  className,
  sizes,
  kenBurns = true,
}: {
  index: number;
  className?: string;
  sizes: string;
  kenBurns?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={HERO_SLIDES[index]}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={kenBurns ? { scale: 1 } : false}
            animate={kenBurns ? { scale: 1.06 } : undefined}
            transition={kenBurns ? { duration: SLIDE_INTERVAL_MS / 1000 + 0.85, ease: "linear" } : undefined}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroNavButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-primary/75 text-white shadow-lg backdrop-blur-sm transition hover:bg-primary hover:scale-105",
        className,
      )}
    >
      {children}
    </button>
  );
}

function HeroHighlights({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-border/70 bg-white/95 px-4 py-3.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="mb-2 block h-1 w-8 rounded-full bg-secondary" />
          {item}
        </div>
      ))}
    </div>
  );
}

function LocationCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/20 bg-primary/92 p-5 shadow-2xl backdrop-blur-md sm:p-6", className)}>
      <div className="flex items-start gap-3 text-white">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Hargeisa</p>
          <p className="mt-1 text-base font-semibold">Near Telesom Headquarters</p>
          <p className="mt-2 text-sm leading-6 text-white/80">Practical ICT education for today&apos;s digital careers.</p>
        </div>
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
  const highlights = [dictionary.hero.quality, dictionary.hero.lecturers, dictionary.hero.studentFocused];
  const { index, progressKey, setPaused, goToSlide, goNext, goPrev } = useHeroSlideshow();

  return (
    <section className="relative overflow-hidden bg-[#F7F8FC]">
      {/* Mobile — full-bleed centered hero */}
      <div
        className="relative min-h-[min(88vh,760px)] lg:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <HeroSlideImage index={index} className="absolute inset-0" sizes="100vw" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,1,155,0.82) 0%, rgba(12,1,155,0.68) 45%, rgba(12,1,155,0.88) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-[min(88vh,760px)] flex-col items-center justify-center px-5 pb-20 pt-20 text-center sm:px-8">
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

          <motion.div {...mobileStagger} transition={{ duration: 0.6, delay: 0.44 }} className="mt-8">
            <LocationCard className="max-w-xs border-white/20 bg-white/10" />
          </motion.div>
        </div>

        {/* Mobile controls — bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6">
          <div className="mx-auto flex max-w-xs flex-col items-center gap-3">
            <HeroSlideProgress progressKey={progressKey} variant="dark" />
            <div className="flex w-full items-center justify-between gap-4">
              <HeroNavButton label="Previous slide" onClick={goPrev}>
                <ChevronLeft className="h-5 w-5" />
              </HeroNavButton>
              <HeroSlideDots index={index} goToSlide={goToSlide} variant="dark" />
              <HeroNavButton label="Next slide" onClick={goNext}>
                <ChevronRight className="h-5 w-5" />
              </HeroNavButton>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {String(index + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8 lg:hidden">
        <HeroHighlights items={highlights} />
      </div>

      {/* Desktop — split layout: content left, full image right */}
      <div className="relative hidden lg:flex lg:min-h-[calc(100vh-7.5rem)]">
        {/* Left content panel */}
        <div className="relative z-10 flex w-[44%] max-w-[640px] shrink-0 flex-col justify-center bg-[#F7F8FC] px-10 py-16 xl:w-[46%] xl:px-14 xl:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(12,1,155,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,1,155,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-4"
            >
              <CollegeLogo src={logo} size="md" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Tanaad College</p>
                <p className="text-sm text-muted-foreground">Center of Leading IT & Technology</p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm"
            >
              <GraduationCap className="h-3.5 w-3.5 text-secondary" />
              Leading Technology
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-6 max-w-xl font-heading text-[2.85rem] font-bold leading-[1.1] tracking-tight text-foreground xl:text-[3.25rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/faculty"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 hover:shadow-lg"
              >
                {dictionary.nav.faculty}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center rounded-full border border-border bg-white px-7 text-sm font-semibold text-primary shadow-sm transition hover:border-primary"
              >
                {dictionary.nav.about}
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-full border border-border bg-white px-7 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
              >
                {dictionary.nav.contact}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-10"
            >
              <HeroHighlights items={highlights} />
            </motion.div>
          </div>
        </div>

        {/* Right image panel — full bleed to screen edge */}
        <div
          className="relative min-h-[calc(100vh-7.5rem)] flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <HeroSlideImage index={index} className="absolute inset-0 h-full w-full" sizes="55vw" />

          {/* Narrow seam blend only at the join with left panel */}
          <div
            className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 xl:w-28"
            style={{
              background: "linear-gradient(90deg, #F7F8FC 0%, rgba(247,248,252,0.75) 35%, transparent 100%)",
            }}
          />

          {/* Prev / next */}
          <div className="absolute start-8 top-1/2 z-20 hidden -translate-y-1/2 xl:flex">
            <HeroNavButton label="Previous slide" onClick={goPrev}>
              <ChevronLeft className="h-5 w-5" />
            </HeroNavButton>
          </div>
          <div className="absolute end-8 top-1/2 z-20 hidden -translate-y-1/2 xl:flex">
            <HeroNavButton label="Next slide" onClick={goNext}>
              <ChevronRight className="h-5 w-5" />
            </HeroNavButton>
          </div>

          <div className="absolute end-6 bottom-8 z-20 max-w-[19rem] xl:end-10 xl:bottom-10 xl:max-w-xs">
            <LocationCard />
          </div>

          {/* Slideshow controls — bottom center of image panel */}
          <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3 px-10 xl:bottom-10">
            <div className="w-full max-w-xs">
              <HeroSlideProgress progressKey={progressKey} variant="dark" />
            </div>
            <div className="flex items-center gap-5">
              <HeroSlideDots index={index} goToSlide={goToSlide} variant="dark" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                {String(index + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
