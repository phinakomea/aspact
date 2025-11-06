// app/news/[id]/page.tsx

import { getArticleById } from '@/lib/guardian-api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  // Fetch only the data inside try/catch — do not construct JSX here.
  interface Article {
    sectionId: string;
    sectionName: string;
    // Add other properties as needed based on getArticleById's return type
  }
  
  let article: Article | null = null;
  try {
    // Await params
    const { id } = await params;
    const articleId = decodeURIComponent(id);
    article = await getArticleById(articleId);
  } catch {
    notFound();
  }

  if (!article) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Rest of the component remains the same */}
      <nav className="mb-6 text-sm">
        <Link href="/news" className="text-blue-600 hover:underline">
          News
        </Link>
        <span className="mx-2">&#9656;</span>
        <Link
          href={`/news?section=${article.sectionId}`}
          className="text-blue-600 hover:underline"
        >
          {article.sectionName}
        </Link>
      </nav>

      {/* Article content... */}
      <article className="bg-white rounded-lg shadow-lg p-8">
        {/* ... rest of article display ... */}
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More from {article.sectionName}</h2>
        <Suspense fallback={<RelatedArticlesSkeleton />}>
          <RelatedArticles sectionId={article.sectionId} />
        </Suspense>
      </div>
    </div>
  );
}

// Simple placeholder skeleton for loading state
function RelatedArticlesSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
    </div>
);}

// Basic RelatedArticles component (server-side) — replace with real fetching logic as needed.
function RelatedArticles({
  sectionId,
}: {
  sectionId: string;
}) {
  // For now return a simple placeholder; swap in fetch logic to load related items.
  return (
    <div className="grid gap-4">
      <div className="p-4 border rounded bg-white shadow-sm">
        <Link href={`/news?section=${encodeURIComponent(sectionId)}`} className="text-blue-600 hover:underline">
          View more in {sectionId}
        </Link>
      </div>
      <div className="p-4 border rounded bg-white shadow-sm text-sm text-gray-600">
        No related articles available.
      </div>
    </div>
  );
}