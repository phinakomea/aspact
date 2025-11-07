import { PoliticalAd, ApiResponse, AnalyticsData, FilterOptions } from '@/types';
import { MOCK_ADS, MOCK_ANALYTICS } from './mockData';

interface ApiConfig {
  facebook: string;
  google: string;
  twitter: string;
}

class AdAPI {
  private async fetchFromRealAPI(endpoint: string): Promise<PoliticalAd[] | null> {
    const APIs: ApiConfig = {
      facebook: 'https://graph.facebook.com/v18.0/ads_library',
      google: 'https://transparencyreport.google.com/transparency/api/v3/politicalads',
      twitter: 'https://ads-api.twitter.com/version/political/ads'
    };

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      return this.transformAPIData(data);
    } catch (error) {
      console.error('API fetch failed:', error);
      return null;
    }
  }

  

  private transformAPIData(apiData: unknown): PoliticalAd[] {
    // Type guard to ensure apiData has the expected structure
    if (typeof apiData !== 'object' || apiData === null || !('ads' in apiData)) {
      return MOCK_ADS;
    }

    const data = apiData as { ads: unknown[] };
    
    return data.ads.map((ad: unknown, index: number) => {
      if (typeof ad !== 'object' || ad === null) {
        return this.createFallbackAd(index.toString());
      }

      const adObj = ad as Record<string, unknown>;
      
      return {
        id: typeof adObj.id === 'string' ? adObj.id : `fallback-${index}`,
        advertiser: typeof adObj.advertiser_name === 'string' ? adObj.advertiser_name : 'Unknown Advertiser',
        candidate: this.extractCandidate(
          typeof adObj.ad_creative_body === 'string' ? adObj.ad_creative_body : ''
        ),
        platform: this.mapPlatform(
          typeof adObj.platform === 'string' ? adObj.platform : 'facebook'
        ),
        format: this.mapFormat(
          typeof adObj.ad_creative_type === 'string' ? adObj.ad_creative_type : 'text'
        ),
        amount_spent: this.getAmountSpent(adObj.spend),
        impressions: this.getImpressions(adObj.impressions),
        start_date: typeof adObj.ad_delivery_start_time === 'string' 
          ? adObj.ad_delivery_start_time 
          : new Date().toISOString(),
        end_date: typeof adObj.ad_delivery_stop_time === 'string' 
          ? adObj.ad_delivery_stop_time 
          : new Date().toISOString(),
        ad_content: typeof adObj.ad_creative_body === 'string' 
          ? adObj.ad_creative_body 
          : 'No content available',
        target_demographics: this.getTargetDemographics(adObj.targeting),
        regions: this.getRegions(adObj.targeting),
        ad_url: typeof adObj.ad_snapshot_url === 'string' 
          ? adObj.ad_snapshot_url 
          : '#',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    });
  }

  private createFallbackAd(id: string): PoliticalAd {
    return {
      id,
      advertiser: 'Unknown Advertiser',
      candidate: 'Unknown',
      platform: 'facebook',
      format: 'text',
      amount_spent: 0,
      impressions: 0,
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      ad_content: 'No content available',
      target_demographics: [],
      regions: ['Unknown'],
      ad_url: '#',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  private getAmountSpent(spend: unknown): number {
    if (typeof spend === 'number') return spend;
    if (typeof spend === 'object' && spend !== null && 'upper_bound' in spend) {
      const bound = (spend as { upper_bound: unknown }).upper_bound;
      return typeof bound === 'number' ? bound : 0;
    }
    return 0;
  }

  private getImpressions(impressions: unknown): number {
    if (typeof impressions === 'number') return impressions;
    if (typeof impressions === 'object' && impressions !== null && 'upper_bound' in impressions) {
      const bound = (impressions as { upper_bound: unknown }).upper_bound;
      return typeof bound === 'number' ? bound : 0;
    }
    return 0;
  }

  private getTargetDemographics(targeting: unknown): string[] {
    if (typeof targeting === 'object' && targeting !== null && 'demographics' in targeting) {
      const demographics = (targeting as { demographics: unknown }).demographics;
      return Array.isArray(demographics) ? demographics.filter((d): d is string => typeof d === 'string') : [];
    }
    return [];
  }

  private getRegions(targeting: unknown): string[] {
    if (typeof targeting === 'object' && targeting !== null && 'regions' in targeting) {
      const regions = (targeting as { regions: unknown }).regions;
      return Array.isArray(regions) ? regions.filter((r): r is string => typeof r === 'string') : [];
    }
    return [];
  }

  private extractCandidate(content: string): string {
    const candidates = ['Trump', 'Biden', 'Harris', 'DeSantis', 'Haley'];
    const found = candidates.find(candidate => 
      content.toLowerCase().includes(candidate.toLowerCase())
    );
    return found || 'Unknown';
  }

  private mapPlatform(platform: string): PoliticalAd['platform'] {
    const platformMap: Record<string, PoliticalAd['platform']> = {
      'facebook': 'facebook',
      'instagram': 'instagram',
      'google': 'youtube',
      'youtube': 'youtube',
      'twitter': 'twitter'
    };
    return platformMap[platform.toLowerCase()] || 'facebook';
  }

  private mapFormat(format: string): PoliticalAd['format'] {
    const formatMap: Record<string, PoliticalAd['format']> = {
      'video': 'video',
      'image': 'image',
      'text': 'text'
    };
    return formatMap[format.toLowerCase()] || 'text';
  }

  async getAds(filters: Partial<FilterOptions> = {}, page: number = 1, limit: number = 20): Promise<ApiResponse> {
    let ads = [...MOCK_ADS];
    
    // Apply filters with proper null checks
    if (filters.adType === 'political') {
      ads = ads.filter(ad => 
        ad.advertiser.toLowerCase().includes('pac') || 
        ad.candidate !== 'Unknown'
      );
    }

    if (filters.searchQuery) {
      ads = ads.filter(ad => 
        ad.advertiser.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    if (filters.candidateQuery) {
      ads = ads.filter(ad => 
        ad.candidate.toLowerCase().includes(filters.candidateQuery!.toLowerCase())
      );
    }

    if (filters.platform) {
      ads = ads.filter(ad => ad.platform === filters.platform);
    }

    if (filters.format) {
      ads = ads.filter(ad => ad.format === filters.format);
    }

    // Fix: Properly handle timeFrame with null checks
    if (filters.timeFrame?.start) {
      const startDate = filters.timeFrame.start;
      ads = ads.filter(ad => new Date(ad.start_date) >= startDate);
    }

    if (filters.timeFrame?.end) {
      const endDate = filters.timeFrame.end;
      ads = ads.filter(ad => new Date(ad.end_date) <= endDate);
    }

    // Apply sorting
    if (filters.amountSpentSort === 'low-high') {
      ads.sort((a, b) => a.amount_spent - b.amount_spent);
    } else if (filters.amountSpentSort === 'high-low') {
      ads.sort((a, b) => b.amount_spent - a.amount_spent);
    }

    if (filters.impressionsSort === 'low-high') {
      ads.sort((a, b) => a.impressions - b.impressions);
    } else if (filters.impressionsSort === 'high-low') {
      ads.sort((a, b) => b.impressions - a.impressions);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAds = ads.slice(startIndex, endIndex);

    return {
      ads: paginatedAds,
      total: ads.length,
      page,
      totalPages: Math.ceil(ads.length / limit)
    };
  }

  // Update the method signature to accept filters (even if not used yet)
  async getAnalytics(filters?: Partial<FilterOptions>): Promise<AnalyticsData> {
  // In a real implementation, this would aggregate data from the API based on filters
  // For now, we'll return mock analytics data
  console.log('Analytics filters:', filters); // Use filters to avoid unused variable warning
  return MOCK_ANALYTICS;
}

  async getAdById(id: string): Promise<PoliticalAd | null> {
    const response = await this.getAds();
    return response.ads.find(ad => ad.id === id) || null;
  }

  async getPlatformStats(): Promise<AnalyticsData['platformBreakdown']> {
    const analytics = await this.getAnalytics();
    return analytics.platformBreakdown;
  }

  async searchAds(query: string): Promise<PoliticalAd[]> {
    const response = await this.getAds({ searchQuery: query });
    return response.ads;
  }
}

export const adAPI = new AdAPI();