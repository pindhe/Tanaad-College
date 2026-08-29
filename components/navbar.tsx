"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { AppLocale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

export function Navbar({
  collegeName,
  logo,
  dictionary,
  locale,
}: {
  collegeName: string;
  logo: string | null;
  dictionary: Dictionary;
  locale: AppLocale;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items: NavItem[] = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/programs", label: dictionary.nav.programs },
    { href: "/admissions", label: dictionary.nav.admissions },
    { href: "/faculty", label: dictionary.nav.faculty },
    { href: "/student-life", label: dictionary.nav.studentLife },
    { href: "/news", label: dictionary.nav.news },
    { href: "/events", label: dictionary.nav.events },
    { href: "/gallery", label: dictionary.nav.gallery },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/10 bg-navy text-white transition-all",
        scrolled ? "h-16 shadow-lg" : "h-20",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 font-heading text-lg font-bold tracking-wide">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm text-navy">
              TC
            </span>
          )}
          <span className="hidden sm:inline">{collegeName.toUpperCase()}</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-white/80 transition-colors hover:text-white",
                pathname === item.href && "text-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link href="/search" aria-label={dictionary.nav.search} className="hidden text-white/80 hover:text-white md:inline-flex">
            <Search className="h-5 w-5" />
          </Link>
          <Button asChild variant="gold" size="sm" className="hidden md:inline-flex">
            <Link href="/apply">{dictionary.nav.applyNow}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy xl:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/search" className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10">
                {dictionary.nav.search}
              </Link>
              <Button asChild variant="gold" className="mt-2">
                <Link href="/apply">{dictionary.nav.applyNow}</Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
