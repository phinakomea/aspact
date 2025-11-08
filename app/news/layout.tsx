// app/news/layout.tsx

import Link from 'next/link';
// import { Suspense } from 'react';

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/news"
                className="hover:text-blue-200 transition"
              >
                Home
              </Link>
              <Link
                href="/news?section=world"
                className="hover:text-blue-200 transition"
              >
                World
              </Link>
              <Link
                href="/news?section=politics"
                className="hover:text-blue-200 transition"
              >
                Politics
              </Link>
              <Link
                href="/news?section=business"
                className="hover:text-blue-200 transition"
              >
                Business
              </Link>
              <Link
                href="/news?section=technology"
                className="hover:text-blue-200 transition"
              >
                Technology
              </Link>
              <Link
                href="/news/search"
                className="hover:text-blue-200 transition"
              >
                Search
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Powered by The Guardian API
            </p>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} All content courtesy of The Guardian
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}