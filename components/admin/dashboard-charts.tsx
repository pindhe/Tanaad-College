"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#0B3D6E", "#C9A227", "#163A5F", "#7A8B99", "#8B1E3F"];

export function DashboardCharts({
  monthly,
  byProgram,
  byStatus,
}: {
  monthly: Array<{ month: string; count: number }>;
  byProgram: Array<{ name: string; count: number }>;
  byStatus: Array<{ name: string; count: number }>;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <ChartCard title="Applications by month">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0B3D6E" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Applications by program">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byProgram}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#C9A227" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Application status">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={byStatus} dataKey="count" nameKey="name" outerRadius={90} label>
              {byStatus.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold">{title}</h2>
      {children}
    </div>
  );
}
