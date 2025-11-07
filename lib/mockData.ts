import { PoliticalAd, AnalyticsData } from '../../types';

export const MOCK_ADS: PoliticalAd[] = [
  {
    id: '1',
    advertiser: 'America First PAC',
    candidate: 'Donald Trump',
    platform: 'facebook',
    format: 'video',
    amount_spent: 150000,
    impressions: 2500000,
    start_date: '2024-01-01',
    end_date: '2024-01-31',
    ad_content: 'Support for presidential campaign focusing on economic policies and border security.',
    target_demographics: ['18-35', 'male', 'conservative'],
    regions: ['National', 'Swing States'],
    ad_url: 'https://facebook.com/ads/1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-31T23:59:59Z'
  },
  {
    id: '2',
    advertiser: 'Progressive Future PAC',
    candidate: 'Joe Biden',
    platform: 'youtube',
    format: 'video',
    amount_spent: 120000,
    impressions: 1800000,
    start_date: '2024-01-15',
    end_date: '2024-02-15',
    ad_content: 'Climate change awareness and environmental protection policies.',
    target_demographics: ['18-25', 'all', 'progressive'],
    regions: ['Swing States', 'Coastal Regions'],
    ad_url: 'https://youtube.com/ads/2',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-15T23:59:59Z'
  }
];

export const MOCK_ANALYTICS: AnalyticsData = {
  totalSpent: 270000,
  totalImpressions: 4300000,
  totalAds: 2,
  platformBreakdown: [
    { platform: 'facebook', amount: 150000, count: 1 },
    { platform: 'youtube', amount: 120000, count: 1 }
  ],
  candidateSpending: [
    { candidate: 'Donald Trump', amount: 150000, ads: 1 },
    { candidate: 'Joe Biden', amount: 120000, ads: 1 }
  ],
  spendingOverTime: [
    { date: '2024-01', amount: 270000, impressions: 4300000 }
  ],
  topAdvertisers: [
    { advertiser: 'America First PAC', amount: 150000, ads: 1 },
    { advertiser: 'Progressive Future PAC', amount: 120000, ads: 1 }
  ],
  formatDistribution: [
    { format: 'video', count: 2, percentage: 100 }
  ]
};




// import { PoliticalAd, AnalyticsData } from '../../types';

// export const MOCK_ADS: PoliticalAd[] = [
//   {
//     id: '1',
//     advertiser: 'America First PAC',
//     candidate: 'Donald Trump',
//     platform: 'facebook',
//     format: 'video',
//     amount_spent: 150000,
//     impressions: 2500000,
//     start_date: '2024-01-01',
//     end_date: '2024-01-31',
//     ad_content: 'Support for presidential campaign focusing on economic policies and border security. This ad reached millions of voters across key swing states.',
//     target_demographics: ['18-35', 'male', 'conservative'],
//     regions: ['National', 'Swing States'],
//     ad_url: 'https://facebook.com/ads/1',
//     created_at: '2024-01-01T00:00:00Z',
//     updated_at: '2024-01-31T23:59:59Z'
//   },
//   {
//     id: '2',
//     advertiser: 'Progressive Future PAC',
//     candidate: 'Joe Biden',
//     platform: 'youtube',
//     format: 'video',
//     amount_spent: 120000,
//     impressions: 1800000,
//     start_date: '2024-01-15',
//     end_date: '2024-02-15',
//     ad_content: 'Climate change awareness and environmental protection policies. Highlighting renewable energy investments.',
//     target_demographics: ['18-25', 'all', 'progressive'],
//     regions: ['Swing States', 'Coastal Regions'],
//     ad_url: 'https://youtube.com/ads/2',
//     created_at: '2024-01-15T00:00:00Z',
//     updated_at: '2024-02-15T23:59:59Z'
//   },
//   {
//     id: '3',
//     advertiser: 'Freedom Caucus PAC',
//     candidate: 'Ron DeSantis',
//     platform: 'instagram',
//     format: 'image',
//     amount_spent: 80000,
//     impressions: 1200000,
//     start_date: '2024-02-01',
//     end_date: '2024-02-28',
//     ad_content: 'Education reform and parental rights in schools. Image-based campaign targeting suburban families.',
//     target_demographics: ['25-45', 'parents', 'suburban'],
//     regions: ['Florida', 'Texas', 'Georgia'],
//     ad_url: 'https://instagram.com/ads/3',
//     created_at: '2024-02-01T00:00:00Z',
//     updated_at: '2024-02-28T23:59:59Z'
//   },
//   {
//     id: '4',
//     advertiser: 'Democratic Alliance PAC',
//     candidate: 'Kamala Harris',
//     platform: 'twitter',
//     format: 'text',
//     amount_spent: 45000,
//     impressions: 900000,
//     start_date: '2024-01-20',
//     end_date: '2024-02-20',
//     ad_content: 'Criminal justice reform and voting rights protection. Text-based ads focusing on policy details.',
//     target_demographics: ['18-30', 'urban', 'progressive'],
//     regions: ['National', 'Urban Centers'],
//     ad_url: 'https://twitter.com/ads/4',
//     created_at: '2024-01-20T00:00:00Z',
//     updated_at: '2024-02-20T23:59:59Z'
//   },
//   {
//     id: '5',
//     advertiser: 'Conservative Victory Fund',
//     candidate: 'Nikki Haley',
//     platform: 'google',
//     format: 'text',
//     amount_spent: 95000,
//     impressions: 1500000,
//     start_date: '2024-02-10',
//     end_date: '2024-03-10',
//     ad_content: 'Foreign policy experience and economic growth. Search ads targeting politically engaged voters.',
//     target_demographics: ['35-65', 'educated', 'conservative'],
//     regions: ['National', 'Early Primary States'],
//     ad_url: 'https://google.com/ads/5',
//     created_at: '2024-02-10T00:00:00Z',
//     updated_at: '2024-03-10T23:59:59Z'
//   },
//   {
//     id: '6',
//     advertiser: 'Climate Action PAC',
//     candidate: 'Joe Biden',
//     platform: 'facebook',
//     format: 'video',
//     amount_spent: 110000,
//     impressions: 1600000,
//     start_date: '2024-01-25',
//     end_date: '2024-02-25',
//     ad_content: 'Clean energy jobs and infrastructure investment. Video ads showcasing renewable projects.',
//     target_demographics: ['18-40', 'all', 'environmental'],
//     regions: ['National', 'Industrial States'],
//     ad_url: 'https://facebook.com/ads/6',
//     created_at: '2024-01-25T00:00:00Z',
//     updated_at: '2024-02-25T23:59:59Z'
//   }
// ];

// export const MOCK_ANALYTICS: AnalyticsData = {
//   totalSpent: 600000,
//   totalImpressions: 9500000,
//   totalAds: 6,
//   platformBreakdown: [
//     { platform: 'facebook', amount: 260000, count: 2 },
//     { platform: 'youtube', amount: 120000, count: 1 },
//     { platform: 'instagram', amount: 80000, count: 1 },
//     { platform: 'twitter', amount: 45000, count: 1 },
//     { platform: 'google', amount: 95000, count: 1 }
//   ],
//   candidateSpending: [
//     { candidate: 'Donald Trump', amount: 150000, ads: 1 },
//     { candidate: 'Joe Biden', amount: 230000, ads: 2 },
//     { candidate: 'Ron DeSantis', amount: 80000, ads: 1 },
//     { candidate: 'Kamala Harris', amount: 45000, ads: 1 },
//     { candidate: 'Nikki Haley', amount: 95000, ads: 1 }
//   ],
//   spendingOverTime: [
//     { date: '2024-01', amount: 270000, impressions: 4300000 },
//     { date: '2024-02', amount: 330000, impressions: 5200000 }
//   ],
//   topAdvertisers: [
//     { advertiser: 'America First PAC', amount: 150000, ads: 1 },
//     { advertiser: 'Progressive Future PAC', amount: 120000, ads: 1 },
//     { advertiser: 'Conservative Victory Fund', amount: 95000, ads: 1 },
//     { advertiser: 'Climate Action PAC', amount: 110000, ads: 1 },
//     { advertiser: 'Freedom Caucus PAC', amount: 80000, ads: 1 }
//   ],
//   formatDistribution: [
//     { format: 'video', count: 3, percentage: 50 },
//     { format: 'image', count: 1, percentage: 17 },
//     { format: 'text', count: 2, percentage: 33 }
//   ]
// };