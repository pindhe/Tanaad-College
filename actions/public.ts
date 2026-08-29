"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { applicationSchema, applicationStatusSchema, contactSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { generateReferenceNumber } from "@/lib/reference";
import { sendAdmissionsNotification, sendApplicationConfirmation } from "@/lib/email";

export async function submitApplication(input: unknown) {
  const headerStore = await headers();
  const limited = rateLimit(`apply:${clientIp(headerStore)}`, 5, 10 * 60_000);
  if (!limited.success) {
    return { ok: false as const, error: "Too many applications. Please try again later." };
  }

  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid application." };
  }

  const program = await prisma.program.findFirst({
    where: { id: parsed.data.programId, published: true },
    select: { id: true, name: true },
  });
  if (!program) {
    return { ok: false as const, error: "Selected program is not available." };
  }

  const referenceNumber = await generateReferenceNumber();
  const application = await prisma.application.create({
    data: {
      referenceNumber,
      fullName: parsed.data.fullName,
      gender: parsed.data.gender,
      dateOfBirth: new Date(parsed.data.dateOfBirth),
      phone: parsed.data.phone,
      email: parsed.data.email.toLowerCase(),
      address: parsed.data.address,
      previousSchool: parsed.data.previousSchool,
      qualification: parsed.data.qualification,
      graduationYear: parsed.data.graduationYear,
      gpa: parsed.data.gpa || null,
      programId: program.id,
      passportPhoto: parsed.data.passportPhoto,
      certificate: parsed.data.certificate,
      identification: parsed.data.identification,
      emergencyName: parsed.data.emergencyName,
      emergencyRelationship: parsed.data.emergencyRelationship,
      emergencyPhone: parsed.data.emergencyPhone,
    },
  });

  await Promise.allSettled([
    sendApplicationConfirmation({
      to: application.email,
      name: application.fullName,
      program: program.name,
      referenceNumber,
    }),
    sendAdmissionsNotification({
      name: application.fullName,
      program: program.name,
      referenceNumber,
    }),
  ]);

  return {
    ok: true as const,
    referenceNumber,
    fullName: application.fullName,
    program: program.name,
    submittedAt: application.createdAt.toISOString(),
    status: application.status,
  };
}

export async function checkApplicationStatus(input: unknown) {
  const headerStore = await headers();
  const limited = rateLimit(`status:${clientIp(headerStore)}`, 10, 60_000);
  if (!limited.success) {
    return { ok: false as const, error: "Too many requests. Please wait a moment." };
  }

  const parsed = applicationStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid details." };
  }

  const contact = parsed.data.contact.trim().toLowerCase();
  const application = await prisma.application.findFirst({
    where: {
      referenceNumber: parsed.data.referenceNumber,
      OR: [{ email: contact }, { phone: parsed.data.contact.trim() }],
    },
    include: { program: { select: { name: true } } },
  });

  if (!application) {
    return { ok: false as const, error: "No application matched those details." };
  }

  return {
    ok: true as const,
    result: {
      referenceNumber: application.referenceNumber,
      fullName: application.fullName,
      status: application.status,
      createdAt: application.createdAt.toISOString(),
      program: application.program.name,
    },
  };
}

export async function submitContactMessage(input: unknown) {
  const headerStore = await headers();
  const limited = rateLimit(`contact:${clientIp(headerStore)}`, 5, 10 * 60_000);
  if (!limited.success) {
    return { ok: false as const, error: "Too many messages. Please try again later." };
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid message." };
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  return { ok: true as const };
}
