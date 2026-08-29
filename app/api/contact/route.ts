import { NextResponse } from "next/server";
import { submitContactMessage } from "@/actions/public";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await submitContactMessage(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}
