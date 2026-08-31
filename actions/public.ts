"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";

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
