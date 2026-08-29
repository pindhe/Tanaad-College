import Link from "next/link";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { WhyChoose } from "@/components/why-choose";
import { ProgramCard } from "@/components/program-card";
import { NewsCard } from "@/components/news-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { CtaSection } from "@/components/cta-section";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/locale";
import { collegeJsonLd } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export default async function HomePage() {
  const [settings, locale, programs, news, testimonials] = await Promise.all([
    getSettings(),
    getLocale(),
    prisma.program.findMany({
      where: { published: true, featured: true },
      include: { department: { include: { faculty: true } } },
      take: 6,
      orderBy: { name: "asc" },
    }),
    prisma.news.findMany({
      where: { published: true, publishedAt: { lte: new Date() } },
      include: { author: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);
  const dictionary = getDictionary(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeJsonLd(settings)) }} />
      <Hero
        title={settings.heroTitle}
        description={settings.heroDescription}
        image={settings.heroImage}
        dictionary={dictionary}
      />
      <StatsSection
        students={settings.statsStudents}
        lecturers={settings.statsLecturers}
        programs={settings.statsPrograms}
        years={settings.statsYears}
      />
      <WhyChoose />
      <Section>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">Featured Programs</h2>
            <p className="mt-2 text-muted-foreground">Explore academic offerings managed by the college.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/programs">{dictionary.hero.explore}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} actionLabel={dictionary.cta.viewProgram} />
          ))}
        </div>
        {programs.length === 0 ? <p className="text-muted-foreground">Programs will appear here once published in the admin dashboard.</p> : null}
      </Section>
      <CtaSection
        title="Start Your Application"
        description="Begin your admission process online and receive a reference number you can track."
        actionLabel={dictionary.cta.startApplication}
      />
      {testimonials.length > 0 ? (
        <Section className="bg-muted/50">
          <h2 className="mb-10 text-center text-3xl">What Our Students Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : null}
      <Section>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-3xl">College News</h2>
          <Button asChild variant="outline"><Link href="/news">View all</Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Section>
      <CtaSection
        title="Your Future Starts Here"
        description="Quality education, practical skills, and a brighter future start here."
        actionLabel={dictionary.cta.applyToday}
      />
    </>
  );
}
