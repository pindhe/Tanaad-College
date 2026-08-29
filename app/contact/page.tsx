import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/settings";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Tanaad College admissions and administration.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader title="Contact" description="Reach the college using the official contact details below." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p><strong>Address:</strong> {settings.address}</p>
            <p><strong>Phone:</strong> {settings.phone}</p>
            <p><strong>Email:</strong> {settings.email}</p>
            <p><strong>WhatsApp:</strong> {settings.whatsapp || "[Official WhatsApp]"}</p>
            <p><strong>Office hours:</strong> {settings.officeHours}</p>
            {settings.googleMapsUrl ? (
              <iframe
                title="Tanaad College map"
                src={settings.googleMapsUrl}
                className="h-72 w-full rounded-xl border"
                loading="lazy"
              />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-xl border bg-muted text-sm text-muted-foreground">
                Google Maps URL can be added in site settings.
              </div>
            )}
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
