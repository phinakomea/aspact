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
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Super PAC Ads Transparency Center
          </h1>
          <p className="text-gray-600">
            Track political advertising across major digital platforms
          </p>
        </div>

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