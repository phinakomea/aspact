export interface PoliticalAd {
  id: string;
  advertiser: string;
  candidate: string;
  platform: 'youtube' | 'google' | 'facebook' | 'instagram' | 'twitter';
  format: 'video' | 'image' | 'text';
  amount_spent: number;
  impressions: number;
  start_date: string;
  end_date: string;
  ad_content: string;
  target_demographics: string[];
  regions: string[];
  ad_url: string;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  adType: 'all' | 'political';
  searchQuery: string;
  candidateQuery: string;
  platform: string;
  format: string;
  timeFrame: {
    start: Date | null;
    end: Date | null;
  };
  amountSpentSort: 'low-high' | 'high-low' | '';
  impressionsSort: 'low-high' | 'high-low' | '';
  minAmount: number;
  maxAmount: number;
}

export interface ApiResponse {
  ads: PoliticalAd[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AnalyticsData {
  totalSpent: number;
  totalImpressions: number;
  totalAds: number;
  platformBreakdown: {
    platform: string;
    amount: number;
    count: number;
  }[];
  candidateSpending: {
    candidate: string;
    amount: number;
    ads: number;
  }[];
  spendingOverTime: {
    date: string;
    amount: number;
    impressions: number;
  }[];
  topAdvertisers: {
    advertiser: string;
    amount: number;
    ads: number;
  }[];
  formatDistribution: {
    format: string;
    count: number;
    percentage: number;
  }[];
}