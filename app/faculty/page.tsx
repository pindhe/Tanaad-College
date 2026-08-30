import Image from "next/image";
import {
  Camera,
  Database,
  Fingerprint,
  Globe,
  HardDrive,
  Layout,
  LineChart,
  Monitor,
  Network,
  Palette,
  Search,
  Video,
  Code2,
  BookOpen,
} from "lucide-react";
import { FacultyCard } from "@/components/faculty-card";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedStaff } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Faculty & Courses",
  description:
    "Diploma of ICT, short professional courses, and Basic Computer Applications at Tanaad College.",
  path: "/faculty",
});

const IMAGES = {
  hero: "/images/imgs/787743859_1817818439793744_5902861751540954248_n.jpg",
  diploma: "/images/imgs/788901948_1601108978040333_6765133490496336309_n.jpg",
  short: "/images/imgs/500379155_1405416951033897_5714435640946410489_n.jpg",
  basic: "/images/imgs/790683925_1817997656442489_4589591040991255365_n.jpg",
  campus: "/images/imgs/502997519_1408768317365427_6447797780186284108_n.jpg",
} as const;

const ictSubjects = [
  { title: "C# Programming", icon: Code2 },
  { title: "SQL Server Database", icon: Database },
  { title: "Network Essentials", icon: Network },
  { title: "Web Design", icon: Globe },
  { title: "Multimedia", icon: Layout },
  { title: "Hardware", icon: HardDrive },
];

const shortCourses = [
  { title: "Graphic Design", icon: Palette, image: IMAGES.short },
  { title: "Video Editing", icon: Video, image: IMAGES.hero },
  { title: "CCTV Camera Installation", icon: Camera, image: IMAGES.campus },
  { title: "Fingerprint / Biometric Technology", icon: Fingerprint, image: IMAGES.basic },
  { title: "Data Analysis", icon: LineChart, image: IMAGES.diploma },
  { title: "Research Methodology", icon: Search, image: IMAGES.short },
];

const officeApps = ["Windows 11", "Word", "Excel", "PowerPoint", "Publisher", "Outlook", "Internet training"];

export default async function FacultyPage() {
  const staff = await getPublishedStaff({});

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden bg-primary text-white sm:min-h-[28rem]">
        <Image
          src={IMAGES.hero}
          alt="Tanaad College graduates"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(12,1,155,0.94) 0%, rgba(12,1,155,0.82) 48%, rgba(12,1,155,0.55) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[22rem] max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[28rem] sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Faculty of ICT</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Courses built for technology careers
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Diploma of ICT, short professional courses, and foundational computer training at Tanaad College.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative min-h-[20rem] overflow-hidden rounded-2xl shadow-lg sm:min-h-[24rem]">
            <Image
              src={IMAGES.diploma}
              alt="Honor of ICT award at Tanaad College"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Flagship program</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Diploma of ICT</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A practical information and communication technology diploma covering programming, databases,
              networking, web, multimedia, and hardware.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">Core subjects</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {ictSubjects.map((subject) => (
                <li
                  key={subject.title}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3"
                >
                  <subject.icon className="h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-sm font-medium">{subject.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Skills programs</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Short & professional courses</h2>
          <p className="mt-4 text-muted-foreground">
            Focused courses for creative, technical, and research skills you can apply at work and in the community.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shortCourses.map((course) => (
            <article key={course.title} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative h-44">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <course.icon className="absolute bottom-4 left-4 h-7 w-7 text-secondary" />
              </div>
              <div className="p-5">
                <h3 className="text-lg">{course.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Foundation</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Basic Computer Applications</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A foundational 3-month program covering Windows 11, Microsoft Office, and internet training — ideal for
              beginners building everyday digital skills.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {officeApps.map((app) => (
                <span
                  key={app}
                  className="inline-flex items-center rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {app}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <Monitor className="h-5 w-5 text-secondary" />
              <span>Duration: 3 months</span>
              <BookOpen className="ms-4 h-5 w-5 text-secondary" />
              <span>Beginner friendly</span>
            </div>
          </div>
          <div className="relative order-1 min-h-[20rem] overflow-hidden rounded-2xl shadow-lg sm:min-h-[24rem] lg:order-2">
            <Image
              src={IMAGES.basic}
              alt="Tanaad College students"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {staff.length > 0 ? (
        <Section className="bg-muted/50">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">People</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Academic staff</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staff.map((person) => (
              <FacultyCard key={person.id} person={person} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
