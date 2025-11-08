// app/news/page.tsx

import { Suspense } from 'react';
import { getTopHeadlines, getSections } from '@/lib/guardian-api';
import Link from 'next/link';
import Image from 'next/image';

function SectionsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

function ArticlesListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="md:flex">
            <div className="md:w-64 md:shrink-0">
              <div className="w-full h-48 md:h-full bg-gray-200"></div>
            </div>
            <div className="p-6 flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{
    section?: string;
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  // Await searchParams
  const params = await searchParams;
  
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-4xl font-bold mb-8">The Guardian News</h1> */}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar with sections */}
        <aside className="lg:w-64">
          <Suspense fallback={<SectionsSkeleton />}>
            <SectionsList currentSection={params.section} />
          </Suspense>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <Suspense 
            key={`${params.section}-${params.page}`}
            fallback={<ArticlesListSkeleton />}
          >
            <ArticlesList section={params.section} page={params.page} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

async function SectionsList({ currentSection }: { currentSection?: string }) {
  const sections = await getSections();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Sections</h2>
      <nav className="space-y-2">
        <Link
          href="/news"
          className={`block px-3 py-2 rounded transition ${
            !currentSection
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          All News
        </Link>
        {sections.slice(0, 15).map((section) => (
          <Link
            key={section.id}
            href={`/news?section=${section.id}`}
            className={`block px-3 py-2 rounded transition ${
              currentSection === section.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {section.webTitle}
          </Link>
        ))}
      </nav>
    </div>
  );
}

async function ArticlesList({ 
  section, 
  page 
}: { 
  section?: string; 
  page?: string;
}) {
  const currentPage = Number(page) || 1;
  const data = await getTopHeadlines(section, 20);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          {data.response.total.toLocaleString()} articles found
        </p>
        <p className="text-gray-600">
          Page {data.response.currentPage} of {data.response.pages}
        </p>
      </div>

      <div className="grid gap-6">
        {data.response.results.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="md:flex">
              {article.fields?.thumbnail && (
                <div className="md:w-64 md:shrink-0">
                  <Image
                    src={article.fields.thumbnail}
                    alt={article.webTitle}
                    width={100}
                    height={100}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-blue-600">
                    {article.sectionName}
                  </span>
                  {article.pillarName && (
                    <span className="text-sm text-gray-500">
                      • {article.pillarName}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  <Link
                    href={`/news/${encodeURIComponent(article.id)}`}
                    className="hover:text-blue-600 transition"
                  >
                    {article.fields?.headline || article.webTitle}
                  </Link>
                </h2>

                {article.fields?.trailText && (
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {article.fields.trailText}
                  </p>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {article.fields?.byline || 'The Guardian'}
                  </span>
                  <time dateTime={article.webPublicationDate}>
                    {new Date(article.webPublicationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <Link
                  href={article.webUrl}
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  Read on The Guardian →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

            {/* Pagination - Fixed */}
            {data.response.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/news?${new URLSearchParams({
                      ...(section && { section }),
                      page: String(currentPage - 1),
                    })}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Previous
                  </Link>
                )}
                
                <span className="px-4 py-2 bg-gray-100 rounded">
                  Page {currentPage} of {data.response.pages}
                </span>
      
                {currentPage < data.response.pages && (
                  <Link
                    href={`/news?${new URLSearchParams({
                      ...(section && { section }),
                      page: String(currentPage + 1),
                    })}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
      
          </div>
        );
      }