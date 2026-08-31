import Image from "next/image";
import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { OFFICIAL_LINKS } from "@/lib/brand";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Tanaad College by phone, email, WhatsApp, or visit Near Telesom Headquarters, Hargeisa.",
  path: "/contact",
});

const HERO_IMAGE = "/images/imgs/19.jpg";
const SIDE_IMAGE = "/images/imgs/3.jpg";

function displayHours(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("[Official")) {
    return "Contact us for current office hours.";
  }
  return trimmed;
}

export default async function ContactPage() {
  const settings = await getSettings();
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;
  const whatsappHref = settings.whatsapp
    ? whatsappLink(settings.whatsapp, "Hello Tanaad College, I would like to learn more about the college.")
    : null;
  const mapsEmbedUrl = settings.googleMapsUrl ?? OFFICIAL_LINKS.googleMapsEmbed;
  const mapsPlaceUrl = OFFICIAL_LINKS.googleMapsPlace;

  return (
    <>
      <PageHeader
        title="Contact us"
        description="Reach Tanaad College by phone, email, WhatsApp, or visit our campus near Telesom Headquarters in Hargeisa."
        image={HERO_IMAGE}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={phoneHref}
            className="group rounded-2xl border border-border bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
          >
            <Phone className="h-6 w-6 text-secondary" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Phone</p>
            <p className="mt-2 text-base font-semibold text-primary group-hover:underline">{settings.phone}</p>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="group rounded-2xl border border-border bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
          >
            <Mail className="h-6 w-6 text-secondary" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</p>
            <p className="mt-2 break-all text-base font-semibold text-primary group-hover:underline">{settings.email}</p>
          </a>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-border bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
            >
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">WhatsApp</p>
              <p className="mt-2 text-base font-semibold text-primary group-hover:underline">{settings.phone}</p>
            </a>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-5">
              <MessageCircle className="h-6 w-6 text-secondary" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">WhatsApp</p>
              <p className="mt-2 text-base font-semibold text-muted-foreground">Not available</p>
            </div>
          )}
          <a
            href={mapsPlaceUrl}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
          >
            <MapPin className="h-6 w-6 text-secondary" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Visit</p>
            <p className="mt-2 text-base font-semibold text-primary group-hover:underline">Open in Maps</p>
          </a>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Get in touch</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">College details</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              We welcome questions about courses, campus visits, and general college information.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="mt-1 text-muted-foreground">{settings.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Office hours</p>
                  <p className="mt-1 text-muted-foreground">{displayHours(settings.officeHours)}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={phoneHref} className="mt-1 block text-primary hover:underline">
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${settings.email}`} className="mt-1 block text-primary hover:underline">
                    {settings.email}
                  </a>
                </div>
              </li>
              {settings.facebook ? (
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Facebook className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Facebook</p>
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-primary hover:underline"
                    >
                      Tanaad Computer Science College
                    </a>
                  </div>
                </li>
              ) : null}
            </ul>

            <div className="relative mt-10 min-h-[16rem] overflow-hidden rounded-2xl">
              <Image
                src={SIDE_IMAGE}
                alt="Tanaad College community"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Hargeisa</p>
                <p className="mt-1 text-lg font-semibold">Near Telesom Headquarters</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Message</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Send us a message</h2>
            <p className="mt-4 mb-8 leading-7 text-muted-foreground">
              Fill in the form and our team will get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="border-b border-border px-6 py-5 sm:px-8">
            <h2 className="text-2xl">Find us</h2>
            <p className="mt-2 text-muted-foreground">{settings.address}</p>
          </div>
          {mapsEmbedUrl ? (
            <iframe
              title="Tanaad College map"
              src={mapsEmbedUrl}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="relative flex min-h-80 flex-col items-center justify-center bg-primary px-6 py-16 text-center text-white">
              <MapPin className="h-10 w-10 text-secondary" />
              <p className="mt-4 max-w-md text-lg font-semibold">{settings.address}</p>
              <a
                href={mapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-foreground transition hover:bg-secondary/90"
              >
                Open location in Google Maps
              </a>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
