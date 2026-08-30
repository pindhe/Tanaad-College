import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Laptop, Mail, MapPin, Monitor, Phone } from "lucide-react";
import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { WhyChoose } from "@/components/why-choose";
import { TestimonialCard } from "@/components/testimonial-card";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/locale";
import { GALLERY_FALLBACK } from "@/lib/gallery-fallback";
import { collegeJsonLd } from "@/lib/metadata";
import { getPublishedTestimonials } from "@/lib/queries";
import { getSettings } from "@/lib/settings";

const IMAGES = {
  about: "/images/imgs/5.jpg",
  diploma: "/images/imgs/1.jpg",
  short: "/images/imgs/500379155_1405416951033897_5714435640946410489_n.jpg",
  basic: "/images/imgs/20.jpg",
} as const;

const courses = [
  {
    title: "Diploma of ICT",
    text: "C#, SQL Server, networking, web design, multimedia, and hardware.",
    href: "/faculty",
    image: IMAGES.diploma,
    icon: Code2,
  },
  {
    title: "Professional Courses",
    text: "Graphic design, video editing, CCTV, biometrics, and data analysis.",
    href: "/faculty",
    image: IMAGES.short,
    icon: Laptop,
  },
  {
    title: "Basic Computer Applications",
    text: "Windows 11, Microsoft Office, and internet training — 3 months.",
    href: "/faculty",
    image: IMAGES.basic,
    icon: Monitor,
  },
];

export default async function HomePage() {
  const [settings, locale, testimonials] = await Promise.all([
    getSettings(),
    getLocale(),
    getPublishedTestimonials(3),
  ]);
  const dictionary = getDictionary(locale);
  const galleryPreview = GALLERY_FALLBACK.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeJsonLd(settings)) }} />

      <Hero
        title={settings.heroTitle}
        description={settings.heroDescription}
        dictionary={dictionary}
        logo={settings.logo}
      />

      <StatsSection
        students={settings.statsStudents}
        lecturers={settings.statsLecturers}
        programs={settings.statsPrograms}
        years={settings.statsYears}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[20rem] overflow-hidden rounded-2xl bg-white shadow-xl sm:min-h-[26rem]">
            <Image
              src={IMAGES.about}
              alt="Complete Diploma of ICT at Tanaad College"
              fill
              className="object-contain p-2"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About us</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Center of Leading IT & Technology</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Tanaad College delivers practical ICT education in Hargeisa — from diploma programs to short professional
              courses and computer foundations for beginners.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              We focus on quality teaching, hands-on skills, and preparing students for technology careers in Somaliland.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/about">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Programs</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Our courses</h2>
            <p className="mt-4 text-muted-foreground">ICT diploma, professional skills, and foundational computer training.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/faculty">View all courses</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.title}
              href={course.href}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <course.icon className="absolute bottom-4 left-4 h-7 w-7 text-secondary" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold group-hover:text-primary">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <WhyChoose />

      <Section className="bg-muted/50">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Gallery</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Campus life</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/gallery">View gallery</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryPreview.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-90" />
              <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{item.title}</p>
            </Link>
          ))}
        </div>
      </Section>

      {testimonials.length > 0 ? (
        <Section>
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Testimonials</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">What our students say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : null}

      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="flex items-start gap-4 rounded-2xl p-4 transition hover:bg-muted/50">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Call us</p>
              <p className="mt-1 font-semibold text-primary">{settings.phone}</p>
            </div>
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-start gap-4 rounded-2xl p-4 transition hover:bg-muted/50">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</p>
              <p className="mt-1 break-all font-semibold text-primary">{settings.email}</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Visit</p>
              <p className="mt-1 font-semibold text-foreground">{settings.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
