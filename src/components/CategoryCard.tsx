import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { VideoCategory } from '../utils/analyzer';

interface CategoryCardProps {
  category: VideoCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const totalViews = category.videos.reduce((sum, video) => sum + video.views, 0);
  const averageViews = Math.round(totalViews / category.videos.length);

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <TrendingUp className="h-5 w-5 text-blue-400" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Videos</span>
          <span className="font-medium">{category.videos.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Views</span>
          <span className="font-medium">{totalViews.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Average Views</span>
          <span className="font-medium">{averageViews.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          Most Viewed: {category.videos[0].title}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;