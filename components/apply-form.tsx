"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";
import { submitApplication } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Option = { id: string; name: string; facultyId?: string; departmentId?: string };

const steps = [
  "Personal Information",
  "Academic Information",
  "Program",
  "Documents",
  "Emergency Contact",
  "Confirmation",
];

export function ApplyForm({
  faculties,
  departments,
  programs,
}: {
  faculties: Option[];
  departments: Option[];
  programs: Option[];
}) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState<{
    referenceNumber: string;
    fullName: string;
    program: string;
    submittedAt: string;
    status: string;
  } | null>(null);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      gender: "MALE",
      dateOfBirth: "",
      phone: "",
      email: "",
      address: "",
      previousSchool: "",
      qualification: "",
      graduationYear: new Date().getFullYear(),
      gpa: "",
      facultyId: "",
      departmentId: "",
      programId: "",
      passportPhoto: "",
      certificate: "",
      identification: "",
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
      confirmed: false,
    },
    mode: "onTouched",
  });

  const facultyId = form.watch("facultyId");
  const departmentId = form.watch("departmentId");

  const filteredDepartments = useMemo(
    () => departments.filter((item) => item.facultyId === facultyId),
    [departments, facultyId],
  );
  const filteredPrograms = useMemo(
    () => programs.filter((item) => item.departmentId === departmentId),
    [programs, departmentId],
  );

  async function upload(file: File, field: "passportPhoto" | "certificate" | "identification") {
    const kind = field === "passportPhoto" ? "image" : "document";
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "applications");
    data.append("kind", kind);
    data.append("private", "true");
    const response = await fetch("/api/upload", { method: "POST", body: data });
    const json = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !json.url) {
      throw new Error(json.error ?? "Upload failed");
    }
    form.setValue(field, json.url, { shouldValidate: true });
  }

  async function nextStep() {
    const fieldsByStep: Array<(keyof ApplicationInput)[]> = [
      ["fullName", "gender", "dateOfBirth", "phone", "email", "address"],
      ["previousSchool", "qualification", "graduationYear", "gpa"],
      ["facultyId", "departmentId", "programId"],
      ["passportPhoto", "certificate", "identification"],
      ["emergencyName", "emergencyRelationship", "emergencyPhone"],
      ["confirmed"],
    ];
    const valid = await form.trigger(fieldsByStep[step]);
    if (valid) setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  async function onSubmit(values: ApplicationInput) {
    const result = await submitApplication(values);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Application submitted successfully.");
    setSuccess(result);
  }

  if (success) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl">Application Submitted Successfully</h2>
        <dl className="mx-auto mt-6 max-w-md space-y-3 text-start text-sm">
          <div className="flex justify-between gap-4"><dt>Applicant</dt><dd className="font-semibold">{success.fullName}</dd></div>
          <div className="flex justify-between gap-4"><dt>Program</dt><dd className="font-semibold">{success.program}</dd></div>
          <div className="flex justify-between gap-4"><dt>Reference</dt><dd className="font-semibold">{success.referenceNumber}</dd></div>
          <div className="flex justify-between gap-4"><dt>Submitted</dt><dd className="font-semibold">{new Date(success.submittedAt).toLocaleDateString()}</dd></div>
          <div className="flex justify-between gap-4"><dt>Status</dt><dd className="font-semibold">{success.status.replaceAll("_", " ")}</dd></div>
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">Keep this reference number to check your application status.</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
      <ol className="mb-8 grid grid-cols-2 gap-2 text-xs font-medium sm:grid-cols-6">
        {steps.map((label, index) => (
          <li key={label} className={`rounded-md px-2 py-2 text-center ${index === step ? "bg-primary text-white" : "bg-muted"}`}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={form.formState.errors.fullName?.message}>
            <Input {...form.register("fullName")} />
          </Field>
          <Field label="Gender" error={form.formState.errors.gender?.message}>
            <select className="h-11 w-full rounded-md border px-3" {...form.register("gender")}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </Field>
          <Field label="Date of birth" error={form.formState.errors.dateOfBirth?.message}>
            <Input type="date" {...form.register("dateOfBirth")} />
          </Field>
          <Field label="Phone" error={form.formState.errors.phone?.message}>
            <Input {...form.register("phone")} />
          </Field>
          <Field label="Email" error={form.formState.errors.email?.message}>
            <Input type="email" {...form.register("email")} />
          </Field>
          <Field label="Address" error={form.formState.errors.address?.message} className="sm:col-span-2">
            <Input {...form.register("address")} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Previous school" error={form.formState.errors.previousSchool?.message}>
            <Input {...form.register("previousSchool")} />
          </Field>
          <Field label="Qualification" error={form.formState.errors.qualification?.message}>
            <Input {...form.register("qualification")} />
          </Field>
          <Field label="Graduation year" error={form.formState.errors.graduationYear?.message}>
            <Input type="number" {...form.register("graduationYear")} />
          </Field>
          <Field label="GPA / Grade" error={form.formState.errors.gpa?.message}>
            <Input {...form.register("gpa")} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <Field label="Faculty" error={form.formState.errors.facultyId?.message}>
            <select className="h-11 w-full rounded-md border px-3" {...form.register("facultyId")} onChange={(event) => {
              form.setValue("facultyId", event.target.value);
              form.setValue("departmentId", "");
              form.setValue("programId", "");
            }}>
              <option value="">Select faculty</option>
              {faculties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="Department" error={form.formState.errors.departmentId?.message}>
            <select className="h-11 w-full rounded-md border px-3" {...form.register("departmentId")} onChange={(event) => {
              form.setValue("departmentId", event.target.value);
              form.setValue("programId", "");
            }}>
              <option value="">Select department</option>
              {filteredDepartments.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="Program" error={form.formState.errors.programId?.message}>
            <select className="h-11 w-full rounded-md border px-3" {...form.register("programId")}>
              <option value="">Select program</option>
              {filteredPrograms.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4">
          <UploadField label="Passport photo" value={form.watch("passportPhoto")} error={form.formState.errors.passportPhoto?.message} accept="image/jpeg,image/png" onFile={(file) => upload(file, "passportPhoto")} />
          <UploadField label="Certificate" value={form.watch("certificate")} error={form.formState.errors.certificate?.message} accept="image/jpeg,image/png,application/pdf" onFile={(file) => upload(file, "certificate")} />
          <UploadField label="ID document" value={form.watch("identification")} error={form.formState.errors.identification?.message} accept="image/jpeg,image/png,application/pdf" onFile={(file) => upload(file, "identification")} />
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Emergency contact name" error={form.formState.errors.emergencyName?.message}>
            <Input {...form.register("emergencyName")} />
          </Field>
          <Field label="Relationship" error={form.formState.errors.emergencyRelationship?.message}>
            <Input {...form.register("emergencyRelationship")} />
          </Field>
          <Field label="Phone" error={form.formState.errors.emergencyPhone?.message}>
            <Input {...form.register("emergencyPhone")} />
          </Field>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Review your details, then confirm and submit your application.</p>
          <label className="flex items-start gap-3 text-sm">
            <Checkbox checked={form.watch("confirmed") === true} onCheckedChange={(value) => form.setValue("confirmed", value === true, { shouldValidate: true })} />
            <span>I confirm that the information provided is accurate.</span>
          </label>
          {form.formState.errors.confirmed ? <p className="text-sm text-destructive">{form.formState.errors.confirmed.message}</p> : null}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={nextStep}>Continue</Button>
        ) : (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function UploadField({
  label,
  accept,
  value,
  error,
  onFile,
}: {
  label: string;
  accept: string;
  value: string;
  error?: string;
  onFile: (file: File) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <Field label={label} error={error}>
      <Input
        type="file"
        accept={accept}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          setBusy(true);
          try {
            await onFile(file);
            toast.success(`${label} uploaded`);
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Upload failed");
          } finally {
            setBusy(false);
          }
        }}
      />
      <p className="mt-1 text-xs text-muted-foreground">{busy ? "Uploading..." : value ? "File uploaded" : "JPG, JPEG, PNG, or PDF"}</p>
    </Field>
  );
}
