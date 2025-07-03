import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return NextResponse.json({ error: "todoが見つかりません" }, { status: 404 });
    }

    await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: !todo.completed },
    });

    return NextResponse.json({ message: "success", todo });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "todoの更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return NextResponse.json({ error: "todoが見つかりません" }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "success", todo });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "todoの削除に失敗しました" }, { status: 500 });
  }
}
