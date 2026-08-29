"use client";

import { useRouter } from "next/navigation";
import { FacultyCard } from "@/components/faculty-card";
import type { StaffCardData } from "@/types";

export function FacultyFilters({
  faculties,
  departments,
  selectedFaculty,
  selectedDepartment,
  staff,
}: {
  faculties: Array<{ id: string; name: string }>;
  departments: Array<{ id: string; name: string; facultyId: string }>;
  selectedFaculty?: string;
  selectedDepartment?: string;
  staff: StaffCardData[];
}) {
  const router = useRouter();
  const visibleDepartments = selectedFaculty
    ? departments.filter((item) => item.facultyId === selectedFaculty)
    : departments;

  function update(next: { faculty?: string; department?: string }) {
    const params = new URLSearchParams();
    if (next.faculty) params.set("faculty", next.faculty);
    if (next.department) params.set("department", next.department);
    router.push(`/faculty${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Faculty
          <select
            className="mt-2 h-11 w-full rounded-md border px-3"
            value={selectedFaculty ?? ""}
            onChange={(event) => update({ faculty: event.target.value || undefined })}
          >
            <option value="">All faculties</option>
            {faculties.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Department
          <select
            className="mt-2 h-11 w-full rounded-md border px-3"
            value={selectedDepartment ?? ""}
            onChange={(event) => update({ faculty: selectedFaculty, department: event.target.value || undefined })}
          >
            <option value="">All departments</option>
            {visibleDepartments.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((person) => (
          <FacultyCard key={person.id} person={person} />
        ))}
      </div>
      {staff.length === 0 ? <p className="text-muted-foreground">No staff match the selected filters.</p> : null}
    </div>
  );
}
