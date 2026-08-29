import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Admissions",
  description: "Admission requirements, application process, and important dates at Tanaad College.",
  path: "/admissions",
});

const steps = [
  { title: "Choose Your Program", text: "Review available programs and select the one that matches your goals." },
  { title: "Complete Application", text: "Fill in personal, academic, and program details in the online form." },
  { title: "Submit Documents", text: "Upload your passport photo, academic certificate, and identification." },
  { title: "Receive Admission Decision", text: "Track your reference number while the admissions office reviews your file." },
];

const documents = ["Identification", "Academic certificate", "Passport photo", "Other required documents"];

export default async function AdmissionsPage() {
  const dates = await prisma.admissionDate.findMany({ orderBy: { date: "asc" } });

  return (
    <>
      <PageHeader title="Start Your Journey With Tanaad College" description="Follow the admission process and apply online." />
      <Section>
        <h2 className="text-3xl">Admission Requirements</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          [Official Admission Requirements] Applicants should provide accurate personal details, academic history, and the documents listed below. Specific program requirements are shown on each program page.
        </p>
      </Section>
      <Section className="bg-muted/40">
        <h2 className="text-3xl">Application Process</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-xl border bg-white p-6">
              <p className="text-sm font-semibold text-secondary">Step {index + 1}</p>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl">Required Documents</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {documents.map((item) => (
            <li key={item} className="rounded-lg border bg-white px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>
      <Section className="bg-muted/40">
        <h2 className="text-3xl">Important Dates</h2>
        <div className="mt-6 space-y-4">
          {dates.map((item) => (
            <article key={item.id} className="rounded-xl border bg-white p-5">
              <p className="text-sm font-semibold text-primary">{formatDate(item.date)}</p>
              <h3 className="mt-1 text-lg">{item.title}</h3>
              {item.description ? <p className="mt-2 text-sm text-muted-foreground">{item.description}</p> : null}
            </article>
          ))}
          {dates.length === 0 ? <p className="text-muted-foreground">Important dates are managed from the admin dashboard.</p> : null}
        </div>
        <Button asChild variant="gold" className="mt-8">
          <Link href="/apply">Start Your Application</Link>
        </Button>
      </Section>
    </>
  );
}
