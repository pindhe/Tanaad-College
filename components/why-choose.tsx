import { Award, Briefcase, GraduationCap, HeartHandshake, Laptop, Users } from "lucide-react";

const items = [
  { title: "Quality Education", text: "Structured teaching focused on strong foundations and student success.", icon: GraduationCap },
  { title: "Experienced Lecturers", text: "Learn from instructors with classroom and professional experience.", icon: Users },
  { title: "Practical Learning", text: "Hands-on ICT training that connects theory with real-world practice.", icon: Laptop },
  { title: "Modern Environment", text: "Teaching spaces designed for focused, contemporary technology study.", icon: Award },
  { title: "Career Development", text: "Guidance that helps students prepare for professional pathways.", icon: Briefcase },
  { title: "Student Support", text: "Academic and campus services throughout the learning journey.", icon: HeartHandshake },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Why Tanaad</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Why Choose Tanaad College?</h2>
          <p className="mt-4 text-muted-foreground">
            A technology-focused college in Hargeisa built for practical skills and student success.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
