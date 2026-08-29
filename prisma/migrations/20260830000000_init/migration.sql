-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'CONTENT_MANAGER', 'ADMISSIONS_OFFICER');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'DOCUMENTS_REQUIRED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('CAMPUS', 'CLASSROOMS', 'LABORATORIES', 'STUDENTS', 'GRADUATION', 'EVENTS', 'SPORTS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CONTENT_MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "overview" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "courses" TEXT NOT NULL DEFAULT '',
    "learningOutcomes" TEXT NOT NULL DEFAULT '',
    "careerOpportunities" TEXT NOT NULL,
    "tuition" TEXT NOT NULL,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "departmentId" TEXT,
    "qualification" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "photo" TEXT,
    "email" TEXT,
    "isLeadership" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "previousSchool" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "gpa" TEXT,
    "programId" TEXT NOT NULL,
    "passportPhoto" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "emergencyName" TEXT NOT NULL,
    "emergencyRelationship" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "authorId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "location" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TEXT NOT NULL,
    "registrationLink" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" "GalleryCategory" NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "photo" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "collegeName" TEXT NOT NULL DEFAULT 'Tanaad College',
    "logo" TEXT,
    "favicon" TEXT,
    "heroTitle" TEXT NOT NULL DEFAULT 'Build Your Future With Tanaad College',
    "heroDescription" TEXT NOT NULL DEFAULT 'Quality education, practical skills, and a brighter future start here.',
    "heroImage" TEXT,
    "phone" TEXT NOT NULL DEFAULT '[Official Phone]',
    "email" TEXT NOT NULL DEFAULT '[Official Email]',
    "address" TEXT NOT NULL DEFAULT '[Official Address]',
    "whatsapp" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "linkedin" TEXT,
    "googleMapsUrl" TEXT,
    "aboutText" TEXT NOT NULL DEFAULT '[Official About]',
    "historyText" TEXT NOT NULL DEFAULT '[Official History]',
    "vision" TEXT NOT NULL DEFAULT '[Official Vision]',
    "mission" TEXT NOT NULL DEFAULT '[Official Mission]',
    "officeHours" TEXT NOT NULL DEFAULT '[Official Office Hours]',
    "statsStudents" INTEGER NOT NULL DEFAULT 0,
    "statsLecturers" INTEGER NOT NULL DEFAULT 0,
    "statsPrograms" INTEGER NOT NULL DEFAULT 0,
    "statsYears" INTEGER NOT NULL DEFAULT 0,
    "studentLifeContent" TEXT NOT NULL DEFAULT '{}',

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionDate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_slug_key" ON "Faculty"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Department_slug_key" ON "Department"("slug");

-- CreateIndex
CREATE INDEX "Department_facultyId_idx" ON "Department"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");

-- CreateIndex
CREATE INDEX "Program_departmentId_idx" ON "Program"("departmentId");

-- CreateIndex
CREATE INDEX "Program_published_featured_idx" ON "Program"("published", "featured");

-- CreateIndex
CREATE INDEX "Staff_departmentId_idx" ON "Staff"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_referenceNumber_key" ON "Application"("referenceNumber");

-- CreateIndex
CREATE INDEX "Application_programId_idx" ON "Application"("programId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_phone_idx" ON "Application"("phone");

-- CreateIndex
CREATE INDEX "Application_referenceNumber_idx" ON "Application"("referenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_published_publishedAt_idx" ON "News"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "News_authorId_idx" ON "News"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_eventDate_idx" ON "Event"("eventDate");

-- CreateIndex
CREATE INDEX "Event_published_idx" ON "Event"("published");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
