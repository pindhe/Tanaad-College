"use client";

import { useRouter } from "next/navigation";
import { locales, type AppLocale } from "@/i18n/config";

const labels: Record<AppLocale, string> = {
  en: "EN",
  so: "SO",
  ar: "AR",
};

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const router = useRouter();

  async function changeLocale(next: AppLocale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold" role="group" aria-label="Language">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => changeLocale(code)}
          className={`rounded px-1.5 py-0.5 ${
            locale === code ? "bg-secondary text-secondary-foreground" : "text-current opacity-80 hover:opacity-100"
          }`}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
