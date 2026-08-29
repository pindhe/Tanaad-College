import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding DEMO data only. Replace official college details in the admin dashboard.");

  const password = await bcrypt.hash("Admin@12345", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@tanaad.college" },
    update: {},
    create: {
      name: "Demo Super Admin",
      email: "admin@tanaad.college",
      password,
      role: "SUPER_ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      collegeName: "Tanaad College",
      heroTitle: "Build Your Future With Tanaad College",
      heroDescription: "Quality education, practical skills, and a brighter future start here.",
      phone: "[Official Phone]",
      email: "[Official Email]",
      address: "[Official Address]",
      whatsapp: "",
      aboutText: "[Official About]",
      historyText: "[Official History]",
      vision: "[Official Vision]",
      mission: "[Official Mission]",
      officeHours: "[Official Office Hours]",
      statsStudents: 0,
      statsLecturers: 0,
      statsPrograms: 0,
      statsYears: 0,
      studentLifeContent: JSON.stringify({
        campusLife: "Campus life details are maintained by administrators.",
        clubs: "Student club information is maintained by administrators.",
        sports: "Sports information is maintained by administrators.",
        events: "Student events are published on the events page.",
        activities: "Student activities are maintained by administrators.",
        communityService: "Community service details are maintained by administrators.",
      }),
    },
  });

  const faculty = await prisma.faculty.upsert({
    where: { slug: "demo-faculty-of-business" },
    update: {},
    create: {
      name: "DEMO Faculty of Business",
      slug: "demo-faculty-of-business",
      description: "Demo faculty for local development. Replace with official faculty information.",
    },
  });

  const faculty2 = await prisma.faculty.upsert({
    where: { slug: "demo-faculty-of-technology" },
    update: {},
    create: {
      name: "DEMO Faculty of Technology",
      slug: "demo-faculty-of-technology",
      description: "Demo faculty for local development. Replace with official faculty information.",
    },
  });

  const department = await prisma.department.upsert({
    where: { slug: "demo-department-of-management" },
    update: {},
    create: {
      name: "DEMO Department of Management",
      slug: "demo-department-of-management",
      description: "Demo department. Replace with official department information.",
      facultyId: faculty.id,
    },
  });

  const department2 = await prisma.department.upsert({
    where: { slug: "demo-department-of-computing" },
    update: {},
    create: {
      name: "DEMO Department of Computing",
      slug: "demo-department-of-computing",
      description: "Demo department. Replace with official department information.",
      facultyId: faculty2.id,
    },
  });

  await prisma.program.upsert({
    where: { slug: "demo-business-administration" },
    update: {},
    create: {
      name: "DEMO Business Administration",
      slug: "demo-business-administration",
      description: "Demo program used to demonstrate the website. Not an official offering unless confirmed by the college.",
      overview: "This demo program exists so the website can be reviewed locally. Replace it with official program content.",
      duration: "[Official Duration]",
      requirements: "[Official Admission Requirements]\nSecondary school certificate\nCompleted application form",
      courses: "Introduction to Management\nPrinciples of Accounting\nBusiness Communication",
      learningOutcomes: "Understand core management concepts\nApply basic business analysis\nCommunicate professionally",
      careerOpportunities: "[Official career information]\nOffice administration\nEntry-level business roles",
      tuition: "[Official Tuition]",
      featured: true,
      published: true,
      departmentId: department.id,
    },
  });

  await prisma.program.upsert({
    where: { slug: "demo-information-technology" },
    update: {},
    create: {
      name: "DEMO Information Technology",
      slug: "demo-information-technology",
      description: "Demo IT program for development and content previews only.",
      overview: "A placeholder program record. Confirm official program names before public launch.",
      duration: "[Official Duration]",
      requirements: "[Official Admission Requirements]",
      courses: "Computer Fundamentals\nProgramming Basics\nNetworks",
      learningOutcomes: "Use core IT tools\nUnderstand introductory programming",
      careerOpportunities: "[Official career information]",
      tuition: "[Official Tuition]",
      featured: true,
      published: true,
      departmentId: department2.id,
    },
  });

  await prisma.staff.upsert({
    where: { id: "demo-leader-1" },
    update: {},
    create: {
      id: "demo-leader-1",
      name: "Demo College Leader",
      position: "Principal (Demo)",
      qualification: "[Official Qualification]",
      biography: "Demo leadership profile. Replace with official biography.",
      isLeadership: true,
      published: true,
      departmentId: department.id,
    },
  });

  await prisma.staff.upsert({
    where: { id: "demo-lecturer-1" },
    update: {},
    create: {
      id: "demo-lecturer-1",
      name: "Demo Lecturer",
      position: "Lecturer (Demo)",
      qualification: "[Official Qualification]",
      biography: "Demo lecturer profile for the faculty directory.",
      published: true,
      departmentId: department2.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: "demo-welcome-students" },
    update: {},
    create: {
      title: "DEMO: Welcome to the new academic period",
      slug: "demo-welcome-students",
      category: "Announcement",
      excerpt: "Demo news item. Replace with official college announcements.",
      content: "This is demo news content used to preview the website. Do not treat it as an official statement.",
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "demo-open-day" },
    update: {},
    create: {
      title: "DEMO Open Day",
      slug: "demo-open-day",
      description: "Demo event used to populate the events page.",
      location: "[Official Campus Location]",
      eventDate: new Date(new Date().getFullYear(), 8, 15),
      eventTime: "09:00",
      published: true,
    },
  });

  await prisma.gallery.createMany({
    data: [
      {
        title: "DEMO Campus",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80",
        category: "CAMPUS",
        published: true,
      },
      {
        title: "DEMO Classroom",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80",
        category: "CLASSROOMS",
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        studentName: "Demo Student",
        program: "DEMO Business Administration",
        graduationYear: 2024,
        content: "Demo testimonial for layout preview. Replace with consented student comments.",
        rating: 5,
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.fAQ.createMany({
    data: [
      { question: "How can I apply?", answer: "Use the Apply Now form and submit the required documents.", category: "Admissions", published: true },
      { question: "What programs are available?", answer: "Published programs are listed on the Programs page.", category: "Programs", published: true },
      { question: "What are the admission requirements?", answer: "[Official Admission Requirements] See the Admissions page and each program page.", category: "Admissions", published: true },
      { question: "How can I contact admissions?", answer: "Use the Contact page, phone, email, or WhatsApp details from site settings.", category: "Contact", published: true },
      { question: "Where is Tanaad College located?", answer: "[Official Address] The address is maintained in site settings.", category: "Contact", published: true },
    ],
    skipDuplicates: true,
  });

  await prisma.admissionDate.createMany({
    data: [
      { title: "DEMO Application opening", date: new Date(new Date().getFullYear(), 6, 1), description: "Demo date. Replace with official admission dates." },
    ],
    skipDuplicates: true,
  });

  console.log("Demo seed complete. Admin login: admin@tanaad.college / Admin@12345");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
