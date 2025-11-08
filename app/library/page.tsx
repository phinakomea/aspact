'use client';

import { useState, useEffect, useCallback } from 'react';
import { PoliticalAd, FilterOptions } from '@/types';
import { adAPI } from '@/lib/api';
import SearchFilters from '@/components/dashboard/SearchFilters';
import AdGrid from '@/components/dashboard/AdGrid';
import DataTable from '@/components/dashboard/DataTable';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

// Define types locally for this component
type ViewMode = 'grid' | 'table';

export default function LibraryPage() {
  const [ads, setAds] = useState<PoliticalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
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

  // Wrap loadAds in useCallback to prevent unnecessary re-renders
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
  }, [filters]); // Add filters as dependency

  useEffect(() => {
    loadAds();
  }, [loadAds]); // Now loadAds is stable due to useCallback

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Advertiser', 'Candidate', 'Platform', 'Format', 'Amount Spent', 'Impressions', 'Start Date', 'End Date'],
      ...ads.map(ad => [
        ad.id,
        ad.advertiser,
        ad.candidate,
        ad.platform,
        ad.format,
        ad.amount_spent.toString(),
        ad.impressions.toString(),
        ad.start_date,
        ad.end_date
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'political-ads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="top-0 left-0 bg-blue-900 h-[120px] md:h-[70px] md:py-2 text-white shadow text-start md:text-center mb-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className='text-start'>
              <h1 className="text-2xl font-bold">
                Political Ad Library
              </h1>
              <small className="text-stone-100">
                Explore and analyze political advertisements across digital platforms
              </small>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex bg-white border border-gray-300 rounded-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    viewMode === 'table'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table View
                </button>
              </div>
              <button
                onClick={exportData}
                className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors duration-200"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-500">Total Ads</div>
            <div className="text-2xl font-bold text-gray-900">{ads.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-500">Total Spent</div>
            <div className="text-2xl font-bold text-green-600">
              ${ads.reduce((sum, ad) => sum + ad.amount_spent, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-500">Total Impressions</div>
            <div className="text-2xl font-bold text-blue-600">
              {ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-sm text-gray-500">Active Platforms</div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(ads.map(ad => ad.platform)).size}
            </div>
          </div>
        </div>

        <SearchFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        <div className="mt-8">
          {loading ? (
            <LoadingSpinner />
          ) : viewMode === 'grid' ? (
            <AdGrid ads={ads} />
          ) : (
            <DataTable ads={ads} />
          )}
        </div>
      </main>
    </div>
  );
}