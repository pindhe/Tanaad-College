import { NextResponse } from "next/server";
import { submitApplication } from "@/actions/public";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(`api-apply:${clientIp(request.headers)}`, 5, 10 * 60_000);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json();
  const result = await submitApplication(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}
