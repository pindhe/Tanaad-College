import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatShortDate } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; program?: string }>;
}) {
  await requireAdmin(["SUPER_ADMIN", "ADMISSIONS_OFFICER"]);
  const params = await searchParams;

  const [programs, applications] = await Promise.all([
    prisma.program.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.application.findMany({
      where: {
        ...(params.status ? { status: params.status as never } : {}),
        ...(params.program ? { programId: params.program } : {}),
        ...(params.q
          ? {
              OR: [
                { fullName: { contains: params.q, mode: "insensitive" } },
                { referenceNumber: { contains: params.q, mode: "insensitive" } },
                { email: { contains: params.q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { program: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Applications</h1>
        <Button asChild variant="outline">
          <a href={`/api/admin/applications/export?${new URLSearchParams(params as Record<string, string>)}`}>Export CSV</a>
        </Button>
      </div>
      <form className="grid gap-3 md:grid-cols-4">
        <input name="q" defaultValue={params.q} placeholder="Search name, email, reference" className="h-11 rounded-md border px-3" />
        <select name="status" defaultValue={params.status} className="h-11 rounded-md border px-3">
          <option value="">All statuses</option>
          {["SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "DOCUMENTS_REQUIRED"].map((status) => (
            <option key={status} value={status}>{status.replaceAll("_", " ")}</option>
          ))}
        </select>
        <select name="program" defaultValue={params.program} className="h-11 rounded-md border px-3">
          <option value="">All programs</option>
          {programs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <Button type="submit">Filter</Button>
      </form>
      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((item) => (
              <TableRow key={item.id}>
                <TableCell><Link className="font-medium text-primary" href={`/admin/applications/${item.id}`}>{item.referenceNumber}</Link></TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.program.name}</TableCell>
                <TableCell>{formatShortDate(item.createdAt)}</TableCell>
                <TableCell>{item.status.replaceAll("_", " ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
