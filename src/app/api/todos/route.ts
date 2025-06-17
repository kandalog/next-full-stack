import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ todos });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "todoの取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const { title } = await req.json();
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    return NextResponse.json({ message: "success", todo });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "todoの作成に失敗しました" },
      { status: 500 }
    );
  }
}
