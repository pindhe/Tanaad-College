"use client";

import { cn, whatsappLink } from "@/lib/utils";

const WHATSAPP_MESSAGE = "Hello Tanaad College, I would like to learn more about the college.";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const iconStyles = {
  facebook: cn(
    "bg-[#1877F2] text-white",
    "shadow-[0_3px_10px_rgba(24,119,242,0.45),0_0_14px_rgba(24,119,242,0.35)]",
    "hover:shadow-[0_5px_16px_rgba(24,119,242,0.55),0_0_20px_rgba(24,119,242,0.5)]",
  ),
  tiktok: cn(
    "bg-[#010101] text-white",
    "shadow-[0_3px_10px_rgba(254,44,85,0.35),0_0_14px_rgba(37,244,238,0.28)]",
    "hover:shadow-[0_5px_16px_rgba(254,44,85,0.45),0_0_20px_rgba(37,244,238,0.38)]",
  ),
  whatsapp: cn(
    "bg-[#25D366] text-white",
    "shadow-[0_3px_10px_rgba(37,211,102,0.45),0_0_14px_rgba(37,211,102,0.35)]",
    "hover:shadow-[0_5px_16px_rgba(37,211,102,0.55),0_0_20px_rgba(37,211,102,0.5)]",
  ),
} as const;

export function SocialIconLinks({
  facebook,
  tiktok,
  whatsapp,
  size = "sm",
  className,
}: {
  facebook?: string | null;
  tiktok?: string | null;
  whatsapp?: string | null;
  size?: "sm" | "md";
  className?: string;
}) {
  const dimension = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const glyph = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const whatsappHref = whatsapp ? whatsappLink(whatsapp, WHATSAPP_MESSAGE) : null;

  const linkClass = cn(
    "inline-flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110",
    dimension,
  );

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {facebook ? (
        <a
          href={facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className={cn(linkClass, iconStyles.facebook)}
        >
          <FacebookIcon className={glyph} />
        </a>
      ) : null}
      {tiktok ? (
        <a
          href={tiktok}
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className={cn(linkClass, iconStyles.tiktok)}
        >
          <TikTokIcon className={glyph} />
        </a>
      ) : null}
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className={cn(linkClass, iconStyles.whatsapp)}
        >
          <WhatsAppIcon className={glyph} />
        </a>
      ) : null}
    </div>
  );
}
