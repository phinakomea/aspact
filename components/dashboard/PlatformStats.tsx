'use client';

import { AnalyticsData } from '../../types';

interface PlatformStatsProps {
  analytics: AnalyticsData;
}

export default function PlatformStats({ analytics }: PlatformStatsProps) {
  const getPlatformColor = (platform: string) => {
    const colors = {
      facebook: 'bg-blue-500',
      youtube: 'bg-red-500',
      instagram: 'bg-pink-500',
      twitter: 'bg-blue-400',
      google: 'bg-green-500'
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-500';
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      facebook: '📘',
      youtube: '📺',
      instagram: '📷',
      twitter: '🐦',
      google: '🔍'
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  return (
    <div className="space-y-6">
      {/* Platform Performance */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
        <div className="space-y-4">
          {analytics.platformBreakdown.map((platform) => (
            <div key={platform.platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${getPlatformColor(platform.platform)}`}>
                  <span className="text-lg">{getPlatformIcon(platform.platform)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {platform.platform}
                  </div>
                  <div className="text-sm text-gray-500">
                    {platform.count} advertisements
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  ${platform.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  spent
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ${(analytics.totalSpent / analytics.totalAds).toLocaleString()}
            </div>
            <div className="text-sm text-blue-800">Avg. Spend per Ad</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {(analytics.totalImpressions / analytics.totalAds).toLocaleString()}
            </div>
            <div className="text-sm text-green-800">Avg. Impressions per Ad</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              ${(analytics.totalSpent / analytics.totalImpressions * 1000).toFixed(2)}
            </div>
            <div className="text-sm text-purple-800">Avg. CPM</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {analytics.platformBreakdown.length}
            </div>
            <div className="text-sm text-orange-800">Active Platforms</div>
          </div>
        </div>
      </div>
    </div>
  );
}