import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "hello get" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "hello post" });
}
