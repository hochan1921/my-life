import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

// 記事詳細取得
export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// 記事更新
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await request.json();
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });
  return NextResponse.json(post);
}

// 記事削除
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}
