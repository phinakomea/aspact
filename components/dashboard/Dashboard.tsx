'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchFilters from '@/components/dashboard/SearchFilters';
import AdGrid from '@/components/dashboard/AdGrid';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';
import { PoliticalAd, FilterOptions } from '@/types';
import { adAPI } from '@/lib/api';

export default function Dashboard() {
  const [ads, setAds] = useState<PoliticalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    adType: 'all',
    searchQuery: '',
    candidateQuery: '',
    platform: '',
    format: '',
    timeFrame: { start: null, end: null },
    amountSpentSort: '',
    impressionsSort: '',
    minAmount: 0,
    maxAmount: 1000000
  });

  const loadAds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adAPI.getAds(filters);
      setAds(response.ads);
    } catch (error) {
      console.error('Error loading ads:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="top-0 left-0 bg-blue-900 md:h-[70px] md:py-2 text-white shadow text-start md:text-center mb-6">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center">       
              <h1 className="text-2xl font-bold">
                AI Super PAC Ads Transparency Center
              </h1>
              <small>
                Track political advertising across major digital platforms
              </small>
          </div>
        </div>
      <main className="container mx-auto px-4 py-8">
        <SearchFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        <div className="mt-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <AdGrid ads={ads} />
          )}
        </div>
      </main>
    </div>
  );
}