'use client';

import { useState } from 'react';
import { PoliticalAd } from '../../types';

interface DataTableProps {
  ads: PoliticalAd[];
}

export default function DataTable({ ads }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof PoliticalAd>('amount_spent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleSort = (field: keyof PoliticalAd) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedAds = [...ads].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof PoliticalAd }) => {
    if (sortField !== field) return <span>↕️</span>;
    return sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('advertiser')}
              >
                <div className="flex items-center space-x-1">
                  <span>Advertiser</span>
                  <SortIcon field="advertiser" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('candidate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Candidate</span>
                  <SortIcon field="candidate" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('platform')}
              >
                <div className="flex items-center space-x-1">
                  <span>Platform</span>
                  <SortIcon field="platform" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('format')}
              >
                Format
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount_spent')}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount Spent</span>
                  <SortIcon field="amount_spent" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center space-x-1">
                  <span>Impressions</span>
                  <SortIcon field="impressions" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAds.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{ad.advertiser}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ad.candidate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {ad.platform}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                    {ad.format}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-green-600">
                    {formatCurrency(ad.amount_spent)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatNumber(ad.impressions)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(ad.start_date).toLocaleDateString()} - {' '}
                    {ad.end_date ? new Date(ad.end_date).toLocaleDateString() : 'Present'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={ad.ad_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    View Ad
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {ads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No ads found</div>
          <p className="text-gray-400 mt-2">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
}