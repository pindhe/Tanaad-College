import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function fromAddress(): string {
  return process.env.EMAIL_FROM ?? "Tanaad College <noreply@example.com>";
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!resend) {
    console.info("[email:dev]", { to, subject });
    return;
  }

  await resend.emails.send({
    from: fromAddress(),
    to,
    subject,
    html,
  });
}

export async function sendApplicationConfirmation(input: {
  to: string;
  name: string;
  program: string;
  referenceNumber: string;
}): Promise<void> {
  await sendEmail(
    input.to,
    `Application received — ${input.referenceNumber}`,
    `<p>Dear ${input.name},</p>
     <p>Thank you for applying to Tanaad College.</p>
     <p><strong>Program:</strong> ${input.program}<br/>
     <strong>Reference:</strong> ${input.referenceNumber}</p>
     <p>You can check your application status using your reference number and the phone or email you provided.</p>
     <p>Tanaad College Admissions</p>`,
  );
}

export async function sendAdmissionsNotification(input: {
  name: string;
  program: string;
  referenceNumber: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await sendEmail(
    adminEmail,
    `New application ${input.referenceNumber}`,
    `<p>A new application has been submitted.</p>
     <p><strong>Applicant:</strong> ${input.name}<br/>
     <strong>Program:</strong> ${input.program}<br/>
     <strong>Reference:</strong> ${input.referenceNumber}</p>`,
  );
}

export async function sendApplicationStatusEmail(input: {
  to: string;
  name: string;
  referenceNumber: string;
  status: string;
}): Promise<void> {
  await sendEmail(
    input.to,
    `Application ${input.referenceNumber} update`,
    `<p>Dear ${input.name},</p>
     <p>The status of your Tanaad College application <strong>${input.referenceNumber}</strong> is now <strong>${input.status.replaceAll("_", " ")}</strong>.</p>
     <p>Tanaad College Admissions</p>`,
  );
}
