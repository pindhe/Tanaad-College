import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { format } from "date-fns";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    totalApplications,
    newApplications,
    accepted,
    rejected,
    totalPrograms,
    totalStaff,
    totalNews,
    totalEvents,
    applications,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({ where: { status: "SUBMITTED" } }),
    prisma.application.count({ where: { status: "ACCEPTED" } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
    prisma.program.count(),
    prisma.staff.count(),
    prisma.news.count(),
    prisma.event.count(),
    prisma.application.findMany({
      include: { program: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const monthlyMap = new Map<string, number>();
  const programMap = new Map<string, number>();
  const statusMap = new Map<string, number>();

  for (const item of applications) {
    const month = format(item.createdAt, "MMM");
    monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + 1);
    programMap.set(item.program.name, (programMap.get(item.program.name) ?? 0) + 1);
    statusMap.set(item.status, (statusMap.get(item.status) ?? 0) + 1);
  }

  const cards = [
    ["Total Applications", totalApplications],
    ["New Applications", newApplications],
    ["Accepted", accepted],
    ["Rejected", rejected],
    ["Programs", totalPrograms],
    ["Staff", totalStaff],
    ["News", totalNews],
    ["Events", totalEvents],
  ] as const;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-xl border bg-white p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 font-heading text-3xl">{value}</p>
          </article>
        ))}
      </div>
      <DashboardCharts
        monthly={[...monthlyMap.entries()].map(([month, count]) => ({ month, count }))}
        byProgram={[...programMap.entries()].map(([name, count]) => ({ name, count }))}
        byStatus={[...statusMap.entries()].map(([name, count]) => ({ name: name.replaceAll("_", " "), count }))}
      />
    </div>
  );
}
