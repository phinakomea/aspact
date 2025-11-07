import { PoliticalAd } from '../../types';
import AdCard from './AdCard';

interface AdGridProps {
  ads: PoliticalAd[];
}

export default function AdGrid({ ads }: AdGridProps) {
  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No ads found matching your criteria</div>
        <p className="text-gray-400 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {ads.length} ads
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}