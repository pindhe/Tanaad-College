import { ApplicationStatusForm } from "@/components/application-status-form";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Application Status",
  description: "Check the status of your Tanaad College application.",
  path: "/application-status",
});

export default function ApplicationStatusPage() {
  return (
    <>
      <PageHeader title="Application Status" description="Enter your reference number and the phone or email used on your application." />
      <Section>
        <div className="mx-auto max-w-xl">
          <ApplicationStatusForm />
        </div>
      </Section>
    </>
  );
}
