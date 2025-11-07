'use client';

import { useState } from 'react';
import { FilterOptions } from '../../types';

interface SearchFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Remove unused variable or use it
  const filterCount = Object.values(filters).filter(value => 
    value !== '' && value !== null && value !== undefined
  ).length;

  // Helper function to handle time frame updates safely
  const handleTimeFrameStartChange = (dateString: string) => {
    const newStartDate = dateString ? new Date(dateString) : null;
    onFilterChange({
      timeFrame: {
        start: newStartDate,
        end: filters.timeFrame?.end || null // Ensure end is never undefined
      }
    });
  };

  const handleTimeFrameEndChange = (dateString: string) => {
    const newEndDate = dateString ? new Date(dateString) : null;
    onFilterChange({
      timeFrame: {
        start: filters.timeFrame?.start || null, // Ensure start is never undefined
        end: newEndDate
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Ad Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad Type
          </label>
          <select
            value={filters.adType}
            onChange={(e) => onFilterChange({ 
              adType: e.target.value as 'all' | 'political' 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ads</option>
            <option value="political">Political Ads</option>
          </select>
        </div>

        {/* Search by Advertiser */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Advertiser
          </label>
          <input
            type="text"
            placeholder="Enter advertiser name..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search by Candidate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Candidate
          </label>
          <input
            type="text"
            placeholder="Enter candidate name..."
            value={filters.candidateQuery}
            onChange={(e) => onFilterChange({ candidateQuery: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Platform Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <select
            value={filters.platform}
            onChange={(e) => onFilterChange({ platform: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="google">Google</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>
        {filterCount > 0 && (
          <span className="text-xs text-gray-500">
            {filterCount} active filter{filterCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4">
          {/* Ad Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ad Format
            </label>
            <select
              value={filters.format}
              onChange={(e) => onFilterChange({ format: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Formats</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="text">Text</option>
            </select>
          </div>

          {/* Amount Spent Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by Amount
            </label>
            <select
              value={filters.amountSpentSort}
              onChange={(e) => onFilterChange({ 
                amountSpentSort: e.target.value as 'low-high' | 'high-low' | '' 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Impressions Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by Impressions
            </label>
            <select
              value={filters.impressionsSort}
              onChange={(e) => onFilterChange({ 
                impressionsSort: e.target.value as 'low-high' | 'high-low' | '' 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Frame
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleTimeFrameStartChange(e.target.value)}
              />
              <input
                type="date"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleTimeFrameEndChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}