import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Code2,
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MapPin,
  Monitor,
  Shield,
  Users,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { CollegeLogo } from "@/components/college-logo";
import { FacultyCard } from "@/components/faculty-card";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { getLeadership } from "@/lib/queries";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  return buildMetadata({
    title: "About",
    description:
      "About Tanaad College — Center of Leading IT & Technology in Hargeisa. Vision, mission, values, and our story.",
    path: "/about",
  });
}

const IMAGES = {
  hero: "/images/imgs/17.png",
  who: "/images/imgs/5.jpg",
  story: "/images/imgs/20.jpg",
  vision: "/images/imgs/3.jpg",
} as const;

const highlights = [
  { label: "Location", value: "Hargeisa", icon: MapPin },
  { label: "Focus", value: "IT & Technology", icon: Laptop },
  { label: "Programs", value: "ICT Diploma & Courses", icon: GraduationCap },
];

const values = [
  { title: "Excellence", text: "High academic standards in teaching and learning.", icon: Award },
  { title: "Integrity", text: "Honesty and accountability with students and partners.", icon: Shield },
  { title: "Innovation", text: "Practical, forward-looking technology education.", icon: Lightbulb },
  { title: "Leadership", text: "Preparing learners to lead in their communities.", icon: Users },
  { title: "Responsibility", text: "Committed to student success and campus life.", icon: HeartHandshake },
  { title: "Service", text: "Serving students, families, and Hargeisa.", icon: Compass },
];

const focusAreas = [
  { title: "Diploma of ICT", text: "C#, SQL Server, networking, web, multimedia, hardware.", icon: Code2 },
  { title: "Professional courses", text: "Graphic design, video editing, CCTV, biometrics, data analysis.", icon: Laptop },
  { title: "Computer foundations", text: "Windows 11, Microsoft Office, internet — 3-month program.", icon: Monitor },
];

const timeline = [
  {
    year: "Foundation",
    text: "Established to serve students seeking quality technology education in Hargeisa.",
  },
  {
    year: "Growth",
    text: "Expanded ICT programs, student achievement, and campus community.",
  },
  {
    year: "Today",
    text: "A leading IT college connecting learning, innovation, and opportunity.",
  },
];

function displayCopy(value: string, fallback: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("[Official")) return fallback;
  return trimmed;
}

export default async function AboutPage() {
  const [settings, leaders] = await Promise.all([getSettings(), getLeadership()]);

  const about = displayCopy(
    settings.aboutText,
    "Tanaad College is a Center of Leading IT & Technology in Hargeisa, focused on quality teaching, practical digital skills, and student success.",
  );
  const history = displayCopy(
    settings.historyText,
    "Founded to expand access to quality technology education, Tanaad College continues to grow near Telesom Headquarters in Hargeisa.",
  );
  const vision = displayCopy(
    settings.vision,
    "To be a trusted college known for skilled ICT graduates and meaningful contribution to Somaliland's digital development.",
  );
  const mission = displayCopy(
    settings.mission,
    "To deliver practical, student-focused IT education that builds competence, character, and opportunity.",
  );

  return (
    <>
      <PageHeader
        title="About Tanaad College"
        description={about}
        image={IMAGES.hero}
        banner
      />

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-6 py-6 sm:px-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-semibold text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[20rem] overflow-hidden rounded-2xl shadow-xl sm:min-h-[26rem]">
            <Image
              src={IMAGES.who}
              alt="Honor of ICT at Tanaad College"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <CollegeLogo src={settings.logo} size="lg" className="h-14 w-14" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Center of Leading IT & Technology
              </p>
              <p className="mt-2 text-xl font-semibold">Near Telesom Headquarters, Hargeisa</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Who we are</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Building digital skills for real careers</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{about}</p>
            <p className="mt-4 leading-7 text-muted-foreground">
              We welcome learners who want focused teaching, hands-on ICT training, and clear pathways into technology
              fields.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/faculty">View courses</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Programs</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">What we offer</h2>
          <p className="mt-4 text-muted-foreground">Practical ICT and digital skills programs for students and professionals.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="border-b border-border bg-primary px-6 py-5 text-white">
                <item.icon className="h-7 w-7 text-secondary" />
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="p-6 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden py-20 sm:py-28">
        <Image src={IMAGES.vision} alt="" fill className="object-cover" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,1,155,0.94) 0%, rgba(12,1,155,0.82) 50%, rgba(14,9,3,0.88) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Direction</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Vision & mission</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
              <Eye className="h-8 w-8 text-secondary" />
              <h3 className="mt-5 text-2xl font-semibold text-white">Vision</h3>
              <p className="mt-4 leading-7 text-white/85">{vision}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
              <Compass className="h-8 w-8 text-secondary" />
              <h3 className="mt-5 text-2xl font-semibold text-white">Mission</h3>
              <p className="mt-4 leading-7 text-white/85">{mission}</p>
            </article>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our story</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Our history</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{history}</p>
            <div className="mt-10 space-y-0">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex gap-6 pb-10 last:pb-0">
                  {index < timeline.length - 1 ? (
                    <span className="absolute start-[1.125rem] top-10 h-[calc(100%-1.5rem)] w-0.5 bg-secondary/40" />
                  ) : null}
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <p className="font-semibold text-primary">{item.year}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl shadow-xl lg:min-h-full">
            <Image
              src={IMAGES.story}
              alt="Tanaad College graduation ceremony"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Values</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">What guides us</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-border bg-white p-6">
              <value.icon className="h-6 w-6 text-secondary" />
              <h3 className="mt-4 font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {leaders.length > 0 ? (
        <Section>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">People</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Leadership</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/faculty">View courses</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((person) => (
              <FacultyCard key={person.id} person={person} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaSection
        title="Visit or reach Tanaad College"
        description="Talk with our team about courses, campus visits, and how we can support your learning journey."
        actionLabel="Contact us"
        href="/contact"
      />
    </>
  );
}
