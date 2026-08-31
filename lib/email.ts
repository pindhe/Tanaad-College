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
