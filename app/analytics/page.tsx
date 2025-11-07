
'use client';

import { useState, useEffect } from 'react';
import { AnalyticsData, Advertiser, CandidateSpending } from '../../types';
import { adAPI } from '@/lib/api';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import PlatformStats from '@/components/dashboard/PlatformStats';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // FIX: Remove the empty object parameter since getAnalytics doesn't accept any
      const data = await adAPI.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into political advertising spending and performance
              </p>
            <div className="mt-4 md:mt-0">
              <select
                value={timeRange}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${analytics.totalSpent.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">Total Impressions</div>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics.totalImpressions.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">Total Ads</div>
                <div className="text-2xl font-bold text-gray-900">
                  {analytics.totalAds}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AnalyticsCharts analytics={analytics} />
          <PlatformStats analytics={analytics} />
        </div>

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Advertisers */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Advertisers</h3>
            <div className="space-y-3">
              {analytics.topAdvertisers.map((advertiser: Advertiser, index: number) => (
                <div key={advertiser.advertiser} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {advertiser.advertiser}
                      </div>
                      <div className="text-xs text-gray-500">
                        {advertiser.ads} ads
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    ${advertiser.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Spending */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Spending</h3>
              <div className="space-y-4">
                {analytics.candidateSpending.map((candidate: CandidateSpending) => (
                  <div key={candidate.candidate}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {candidate.candidate}
                      </span>
                      <span className="text-sm text-gray-600">
                        ${candidate.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(candidate.amount / Math.max(...analytics.candidateSpending.map((c: CandidateSpending) => c.amount))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}