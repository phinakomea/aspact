// Local PoliticalAd type for this component to avoid path alias issues
interface PoliticalAd {
  platform: string;
  format: string;
  advertiser: string;
  candidate: string;
  ad_content: string;
  amount_spent: number;
  impressions: number;
  start_date: string;
  end_date?: string | null;
  regions: string[];
  target_demographics: string[];
  ad_url: string;
}

interface AdCardProps {
  ad: PoliticalAd;
}

export default function AdCard({ ad }: AdCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getPlatformIcon(ad.platform)}</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
              {ad.platform}
            </span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded capitalize">
              {ad.format}
            </span>
          </div>
        </div>

        {/* Advertiser and Candidate */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {ad.advertiser}
          </h3>
          <p className="text-sm text-gray-600">
            Supporting: <span className="font-medium">{ad.candidate}</span>
          </p>
        </div>

        {/* Ad Content Preview */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-3">
            {ad.ad_content}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500">Amount Spent</div>
            <div className="font-semibold text-green-600">
              {formatCurrency(ad.amount_spent)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Impressions</div>
            <div className="font-semibold text-blue-600">
              {formatNumber(ad.impressions)}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-500 mb-4">
          {new Date(ad.start_date).toLocaleDateString()} - {' '}
          {ad.end_date ? new Date(ad.end_date).toLocaleDateString() : 'Present'}
        </div>

        {/* Target Info */}
        <div className="text-xs text-gray-600">
          <div className="mb-1">
            <strong>Target:</strong> {ad.regions.join(', ')}
          </div>
          {ad.target_demographics.length > 0 && (
            <div>
              <strong>Demographics:</strong> {ad.target_demographics.join(', ')}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t">
          <a
            href={ad.ad_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium py-2 px-4 rounded-md text-center block transition-colors duration-200"
          >
            View Ad Details
          </a>
        </div>
      </div>
    </div>
  );
}