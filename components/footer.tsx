import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { CollegeLogo } from "@/components/college-logo";
import type { SiteSettingsData } from "@/types";
import type { Dictionary } from "@/i18n/get-dictionary";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.5 3h2.1c.2 1.8 1.4 3.3 3.4 3.7v2.2c-1.2 0-2.3-.4-3.3-1v6.7c0 3.4-2.8 6.2-6.3 6.2S4.1 18 4.1 14.6c0-3.3 2.6-6 5.9-6.2v2.3c-2 .2-3.6 1.9-3.6 3.9 0 2.2 1.8 3.9 4 3.9s4-1.8 4-3.9V3z" />
    </svg>
  );
}

export function Footer({ settings, dictionary }: { settings: SiteSettingsData; dictionary: Dictionary }) {
  const socials = [
    { href: settings.facebook, label: "Facebook", icon: Facebook },
    { href: settings.instagram, label: "Instagram", icon: Instagram },
    { href: settings.tiktok, label: "TikTok", icon: TikTokIcon },
    { href: settings.youtube, label: "YouTube", icon: Youtube },
    { href: settings.linkedin, label: "LinkedIn", icon: Linkedin },
  ].filter((item) => item.href);

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <CollegeLogo src={settings.logo} size="lg" />
            <h2 className="font-heading text-xl">{settings.collegeName}</h2>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Quality education, practical skills, and a brighter future start here.
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="rounded-full border border-white/20 p-2 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/">{dictionary.nav.home}</Link></li>
            <li><Link href="/about">{dictionary.nav.about}</Link></li>
            <li><Link href="/faculty">{dictionary.nav.faculty}</Link></li>
            <li><Link href="/gallery">{dictionary.nav.gallery}</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">{dictionary.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li>{settings.address}</li>
            {settings.whatsapp ? <li>WhatsApp: {settings.whatsapp}</li> : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © 2026 {settings.collegeName}. All Rights Reserved.
      </div>
    </footer>
  );
}
