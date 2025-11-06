// lib/guardian-api.ts
//import axios, { AxiosError } from 'axios';

import axios from 'axios';

import type {
  GuardianResponse,
  GuardianSingleResponse,
  GuardianArticle,
  GuardianSection,
  GuardianSearchParams,
} from '@/types/guardian';

const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com';
const API_KEY = process.env.GUARDIAN_API_KEY;

if (!API_KEY) {
  throw new Error('GUARDIAN_API_KEY environment variable is not set');
}

const guardianClient = axios.create({
  baseURL: GUARDIAN_API_BASE_URL,
  params: {
    'api-key': API_KEY,
  },
  timeout: 10000,
});

export class GuardianApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'GuardianApiError';
  }
}

// Search for articles
export async function searchArticles(
  params: GuardianSearchParams = {}
): Promise<GuardianResponse> {
  try {
    const searchParams = {
      'show-fields': params.showFields || 'headline,trailText,thumbnail,bodyText,byline',
      'show-tags': params.showTags || 'contributor',
      'page-size': params.pageSize || 10,
      page: params.page || 1,
      'order-by': params.orderBy || 'newest',
      ...(params.q && { q: params.q }),
      ...(params.section && { section: params.section }),
      ...(params.tag && { tag: params.tag }),
      ...(params.fromDate && { 'from-date': params.fromDate }),
      ...(params.toDate && { 'to-date': params.toDate }),
      ...(params.showBlocks && { 'show-blocks': params.showBlocks }),
    };

    const response = await guardianClient.get<GuardianResponse>('/search', {
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GuardianApiError(
        error.response?.data?.response?.message || error.message,
        error.response?.status,
        error
      );
    }
    throw new GuardianApiError('Unknown error occurred', undefined, error);
  }
}

// Get top headlines (latest articles)
export async function getTopHeadlines(
  section?: string,
  pageSize: number = 20
): Promise<GuardianResponse> {
  return searchArticles({
    section,
    pageSize,
    orderBy: 'newest',
    showFields: 'headline,trailText,thumbnail,bodyText,byline,firstPublicationDate',
  });
}

// Get single article by ID
export async function getArticleById(articleId: string): Promise<GuardianArticle> {
  try {
    const response = await guardianClient.get<GuardianSingleResponse>(`/${articleId}`, {
      params: {
        'show-fields': 'headline,trailText,thumbnail,bodyText,byline,body,firstPublicationDate',
        'show-tags': 'contributor,keyword',
        'show-blocks': 'all',
      },
    });

    return response.data.response.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GuardianApiError(
        error.response?.data?.response?.message || error.message,
        error.response?.status,
        error
      );
    }
    throw new GuardianApiError('Unknown error occurred', undefined, error);
  }
}

// Get all sections
export async function getSections(): Promise<GuardianSection[]> {
  try {
    const response = await guardianClient.get<GuardianResponse<GuardianSection>>('/sections');
    return response.data.response.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GuardianApiError(
        error.response?.data?.response?.message || error.message,
        error.response?.status,
        error
      );
    }
    throw new GuardianApiError('Unknown error occurred', undefined, error);
  }
}

// Get articles by section
export async function getArticlesBySection(
  sectionId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<GuardianResponse> {
  return searchArticles({
    section: sectionId,
    page,
    pageSize,
    showFields: 'headline,trailText,thumbnail,bodyText,byline',
  });
}

// Search articles by query
export async function searchByQuery(
  query: string,
  page: number = 1,
  pageSize: number = 20
): Promise<GuardianResponse> {
  return searchArticles({
    q: query,
    page,
    pageSize,
    orderBy: 'relevance',
    showFields: 'headline,trailText,thumbnail,bodyText,byline',
  });
}

// Get articles by date range
export async function getArticlesByDateRange(
  fromDate: string,
  toDate: string,
  section?: string
): Promise<GuardianResponse> {
  return searchArticles({
    fromDate,
    toDate,
    section,
    orderBy: 'newest',
    showFields: 'headline,trailText,thumbnail,bodyText,byline,firstPublicationDate',
  });
}

// Get latest articles with specific tags
export async function getArticlesByTag(
  tag: string,
  pageSize: number = 10
): Promise<GuardianResponse> {
  return searchArticles({
    tag,
    pageSize,
    showFields: 'headline,trailText,thumbnail,bodyText,byline',
    showTags: 'all',
  });
}




// lib/guardian-api.ts (add to existing file)

// For server components with automatic revalidation
export const revalidate = 300; // Revalidate every 5 minutes

// Or use unstable_cache for more control
import { unstable_cache } from 'next/cache';

export const getCachedTopHeadlines = unstable_cache(
  async (section?: string, pageSize: number = 20) => {
    return getTopHeadlines(section, pageSize);
  },
  ['guardian-top-headlines'],
  {
    revalidate: 300, // 5 minutes
    tags: ['guardian-news'],
  }
);

export const getCachedArticleById = unstable_cache(
  async (articleId: string) => {
    return getArticleById(articleId);
  },
  ['guardian-article'],
  {
    revalidate: 3600, // 1 hour (articles don't change often)
    tags: ['guardian-article'],
  }
);

export const getCachedSections = unstable_cache(
  async () => {
    return getSections();
  },
  ['guardian-sections'],
  {
    revalidate: 86400, // 24 hours (sections rarely change)
    tags: ['guardian-sections'],
  }
);