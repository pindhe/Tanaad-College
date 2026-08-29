import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ApplicationActions } from "@/components/admin/application-actions";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin(["SUPER_ADMIN", "ADMISSIONS_OFFICER"]);
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { program: true },
  });
  if (!application) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{application.referenceNumber}</h1>
        <a href={`/admin/applications/${application.id}/print`} className="text-sm font-semibold text-primary">Print</a>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border bg-white p-6">
          <h2 className="text-xl">Applicant</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Name" value={application.fullName} />
            <Row label="Gender" value={application.gender} />
            <Row label="Date of birth" value={formatDate(application.dateOfBirth)} />
            <Row label="Phone" value={application.phone} />
            <Row label="Email" value={application.email} />
            <Row label="Address" value={application.address} />
            <Row label="Previous school" value={application.previousSchool} />
            <Row label="Qualification" value={application.qualification} />
            <Row label="Graduation year" value={String(application.graduationYear)} />
            <Row label="GPA" value={application.gpa ?? "—"} />
            <Row label="Program" value={application.program.name} />
            <Row label="Emergency" value={`${application.emergencyName} (${application.emergencyRelationship}) ${application.emergencyPhone}`} />
          </dl>
        </article>
        <article className="space-y-4 rounded-xl border bg-white p-6">
          <h2 className="text-xl">Documents</h2>
          <a className="block text-primary" href={application.passportPhoto} target="_blank" rel="noreferrer">Passport photo</a>
          <a className="block text-primary" href={application.certificate} target="_blank" rel="noreferrer">Certificate</a>
          <a className="block text-primary" href={application.identification} target="_blank" rel="noreferrer">Identification</a>
          <ApplicationActions
            id={application.id}
            status={application.status}
            notes={application.adminNotes ?? ""}
          />
        </article>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-end font-medium">{value}</dd>
    </div>
  );
}
