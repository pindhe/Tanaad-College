"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CollegeLogo } from "@/components/college-logo";
import { SocialIconLinks } from "@/components/social-icon-links";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

export function Navbar({
  collegeName,
  logo,
  dictionary,
  phone,
  facebook,
  tiktok,
  whatsapp,
}: {
  collegeName: string;
  logo: string | null;
  dictionary: Dictionary;
  phone: string;
  facebook?: string | null;
  tiktok?: string | null;
  whatsapp?: string | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items: NavItem[] = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/faculty", label: dictionary.nav.faculty },
    { href: "/gallery", label: dictionary.nav.gallery },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={cn("sticky top-0 z-40 transition-shadow duration-300", scrolled && "shadow-md")}>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-[13px] sm:px-6">
          <SocialIconLinks facebook={facebook} tiktok={tiktok} whatsapp={whatsapp} />
          <div className="flex items-center gap-5">
            {phone ? (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 text-white/90 hover:text-white">
                <Phone className="h-3.5 w-3.5" />
                <span>{phone}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-white">
        <div className={cn("mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6", scrolled ? "h-16" : "h-[4.5rem]")}>
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <CollegeLogo src={logo} size="lg" priority className="h-12 w-12" />
            <span className="hidden truncate font-heading text-lg font-bold tracking-wide text-primary sm:inline">
              {collegeName}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-[15px] font-semibold transition-colors",
                    active ? "text-primary" : "text-foreground/70 hover:text-primary",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-[2px] h-[3px] rounded-full bg-secondary transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary lg:hidden"
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
            className="overflow-hidden border-b border-slate-200 bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-semibold",
                    pathname === item.href ? "bg-accent text-primary" : "text-foreground/70 hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
