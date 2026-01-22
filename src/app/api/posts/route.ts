import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 記事一覧取得
export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

// 記事作成
export async function POST(request: Request) {
  const body = await request.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published ?? false,
    },
  });
  return NextResponse.json(post);
}
