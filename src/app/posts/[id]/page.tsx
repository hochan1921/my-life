import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <p className="text-sm text-gray-400 mt-2">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </p>
          <div className="mt-6 prose prose-gray max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{post.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
