// hooks/useGuardianNews.ts
'use client';

import { useState, useEffect } from 'react';
import type { GuardianResponse } from '@/types/guardian';

interface UseGuardianNewsOptions {
  section?: string;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export function useGuardianNews(options: UseGuardianNewsOptions = {}) {
  const { section, page = 1, pageSize = 20, enabled = true } = options;
  const [data, setData] = useState<GuardianResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          ...(section && { section }),
        });

        const response = await fetch(`/api/news?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [section, page, pageSize, enabled]);

  return { data, isLoading, error };
}