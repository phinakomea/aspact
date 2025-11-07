'use client';

import { AnalyticsData } from '../../types';

interface AnalyticsChartsProps {
  analytics: AnalyticsData;
}

export default function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  // Simple chart implementation - in production, use a library like Chart.js or Recharts
  const maxSpending = Math.max(...analytics.spendingOverTime.map(d => d.amount));
  
  return (
    <div className="space-y-6">
      {/* Spending Over Time */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Over Time</h3>
        <div className="space-y-3">
          {analytics.spendingOverTime.map((period) => (
            <div key={period.date} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-500">
                {new Date(period.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    ${period.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {period.impressions.toLocaleString()} impressions
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(period.amount / maxSpending) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
        <div className="space-y-3">
          {analytics.platformBreakdown.map((platform) => (
            <div key={platform.platform} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="capitalize text-sm font-medium text-gray-700">
                  {platform.platform}
                </span>
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {platform.count} ads
                </span>
              </div>
              <div className="text-sm font-semibold text-blue-600">
                ${platform.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format Distribution */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Format Distribution</h3>
        <div className="space-y-3">
          {analytics.formatDistribution.map((format) => (
            <div key={format.format}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {format.format}
                </span>
                <span className="text-sm text-gray-600">
                  {format.count} ads ({format.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${format.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}