import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale, isRtl, type AppLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const base = buildMetadata({
    title: settings.collegeName,
    description: settings.heroDescription,
    path: "/",
    image: settings.heroImage,
  });

  return {
    ...base,
    title: {
      default: settings.collegeName,
      template: `%s | ${settings.collegeName}`,
    },
    icons: settings.favicon ? { icon: settings.favicon } : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const localeValue = headerStore.get("x-locale");
  const locale: AppLocale = isLocale(localeValue ?? "") ? (localeValue as AppLocale) : defaultLocale;
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const settings = await getSettings();
  const dictionary = getDictionary(locale);
  const isAdmin = headerStore.get("x-pathname")?.startsWith("/admin") ?? false;

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        {isAdmin ? (
          children
        ) : (
          <>
            <Navbar
              collegeName={settings.collegeName}
              logo={settings.logo}
              dictionary={dictionary}
              locale={locale}
            />
            <main>{children}</main>
            <Footer settings={settings} dictionary={dictionary} />
            <WhatsAppButton number={settings.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""} />
          </>
        )}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
