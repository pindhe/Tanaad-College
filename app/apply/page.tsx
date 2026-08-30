import { ApplyForm } from "@/components/apply-form";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getApplyOptions } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Apply",
  description: "Submit an online application to Tanaad College.",
  path: "/apply",
});

export default async function ApplyPage() {
  const { faculties, departments, programs } = await getApplyOptions();

  return (
    <>
      <PageHeader title="Online Application" description="Complete the multi-step form to apply for a published program." />
      <Section>
        <ApplyForm faculties={faculties} departments={departments} programs={programs} />
      </Section>
    </>
  );
}
