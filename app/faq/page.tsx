import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedFaqs } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Tanaad College admissions and programs.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <Section>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl rounded-xl border bg-white px-6">
          {faqs.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {faqs.length === 0 ? <p className="text-center text-muted-foreground">FAQ content is managed from the admin dashboard.</p> : null}
      </Section>
    </>
  );
}
