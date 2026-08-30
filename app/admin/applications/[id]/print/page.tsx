import { notFound } from "next/navigation";
import { CollegeLogo } from "@/components/college-logo";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function PrintApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin(["SUPER_ADMIN", "ADMISSIONS_OFFICER"]);
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { program: true },
  });
  if (!application) notFound();

  return (
    <article className="mx-auto max-w-3xl bg-white p-8 print:p-0">
      <div className="mb-6 flex items-center gap-3">
        <CollegeLogo size="md" />
        <h1 className="text-2xl">Tanaad College Application</h1>
      </div>
      <p className="mt-2 font-semibold">{application.referenceNumber}</p>
      <dl className="mt-6 grid gap-2 text-sm">
        <p><strong>Name:</strong> {application.fullName}</p>
        <p><strong>Program:</strong> {application.program.name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Submitted:</strong> {formatDate(application.createdAt)}</p>
        <p><strong>Status:</strong> {application.status.replaceAll("_", " ")}</p>
        <p><strong>Address:</strong> {application.address}</p>
        <p><strong>Previous school:</strong> {application.previousSchool}</p>
        <p><strong>Qualification:</strong> {application.qualification} ({application.graduationYear})</p>
      </dl>
    </article>
  );
}
