"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          My Blog
        </Link>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <span className="text-gray-400">Loading...</span>
          ) : session ? (
            <>
              <span className="text-gray-600">{session.user?.name}</span>
              <Link
                href="/posts/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                New Post
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
