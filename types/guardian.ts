// types/guardian.ts

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId?: string;
  pillarName?: string;
  fields?: {
    headline: string;
    trailText: string;
    thumbnail?: string;
    bodyText: string;
    byline?: string;
    firstPublicationDate?: string;
    main?: string;
    body?: string;
    wordcount?: string;
    commentCloseDate?: string;
    starRating?: string;
    shortUrl?: string;
  };
  tags?: GuardianTag[];
  blocks?: {
    main?: boolean;
    body?: Array<{
      id: string;
      bodyHtml: string;
      bodyTextSummary: string;
      attributes: Record<string, string>;
      published: boolean;
      createdDate: string;
      lastModifiedDate: string;
    }>;
  };
}

export interface GuardianTag {
  id: string;
  type: string;
  sectionId?: string;
  sectionName?: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  references?: Array<{
    type: string;
    id: string;
  }>;
  bio?: string;
  bylineImageUrl?: string;
  firstName?: string;
  lastName?: string;
}

export interface GuardianSection {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions?: Array<{
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    code: string;
  }>;
}

export interface GuardianResponse<T = GuardianArticle> {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: T[];
  };
}

export interface GuardianSingleResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    content: GuardianArticle;
  };
}

export interface GuardianSearchParams {
  q?: string; // Search query
  section?: string; // Filter by section
  tag?: string; // Filter by tag
  fromDate?: string; // YYYY-MM-DD
  toDate?: string; // YYYY-MM-DD
  orderBy?: 'newest' | 'oldest' | 'relevance';
  page?: number;
  pageSize?: number; // 1-50
  showFields?: string; // Comma-separated: headline,trailText,thumbnail,bodyText,etc
  showTags?: string; // Comma-separated: contributor,keyword,etc
  showBlocks?: 'all' | 'body' | 'main';
}

export interface GuardianErrorResponse {
  response: {
    status: string;
    message: string;
  };
}