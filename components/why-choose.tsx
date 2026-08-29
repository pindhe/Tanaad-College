import { Award, Briefcase, GraduationCap, HeartHandshake, Laptop, Users } from "lucide-react";

const items = [
  { title: "Quality Education", text: "A structured academic environment focused on strong foundations and student success.", icon: GraduationCap },
  { title: "Experienced Lecturers", text: "Learn from instructors who bring classroom expertise and professional experience.", icon: Users },
  { title: "Practical Learning", text: "Programs designed to connect theory with applied classroom and workshop practice.", icon: Laptop },
  { title: "Modern Learning Environment", text: "Facilities and teaching spaces intended to support focused, contemporary study.", icon: Award },
  { title: "Career Development", text: "Guidance that helps students prepare for professional pathways after graduation.", icon: Briefcase },
  { title: "Student Support", text: "Admissions, academic, and student services to support learners throughout their studies.", icon: HeartHandshake },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl">Why Choose Tanaad College?</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
