// app/news/search/page.tsx

import { Suspense } from 'react';
import { searchByQuery } from '@/lib/guardian-api';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  // Await searchParams
  const params = await searchParams;
  const query = params.q || '';

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <SearchForm initialQuery={query} />
      </div>

      {query && (
        <Suspense key={`${query}-${params.page}`} fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} page={Number(params.page) || 1} />
        </Suspense>
      )}

      {!query && (
        <p className="text-gray-600 text-center mt-12">
          Enter a search term to find articles
        </p>
      )}
    </div>
  );
}

function SearchForm({ initialQuery }: { initialQuery: string }) {
  return (
    <form action="/news/search" method="get" className="flex gap-2">
      <input
        type="text"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search articles..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const data = await searchByQuery(query, page, 20);

  if (data.response.results.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-xl text-gray-600">No results found for &quot;{query}&quot;</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-600 mb-6">
        Found {data.response.total.toLocaleString()} results for &quot;{query}&quot;
      </p>

      <div className="grid gap-6">
        {data.response.results.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow p-6">
            <span className="text-sm text-blue-600 font-semibold">
              {article.sectionName}
            </span>
            <h2 className="text-xl font-bold mt-2 mb-3">
              <Link
                href={`/news/${encodeURIComponent(article.id)}`}
                className="hover:text-blue-600 transition"
              >
                {article.fields?.headline || article.webTitle}
              </Link>
            </h2>
            {article.fields?.trailText && (
              <p className="text-gray-700 mb-3">{article.fields.trailText}</p>
            )}
            <time className="text-sm text-gray-500">
              {new Date(article.webPublicationDate).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>

      {/* Pagination - Fixed */}
      {data.response.pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/news/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 bg-gray-100 rounded">
            Page {page} of {data.response.pages}
          </span>
          {page < data.response.pages && (
            <Link
              href={`/news/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="grid gap-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}