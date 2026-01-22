import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/posts/${post.id}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">by {post.author.name}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
