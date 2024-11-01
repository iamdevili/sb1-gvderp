import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { VideoCategory } from '../utils/analyzer';

interface VideoListProps {
  categories: VideoCategory[];
}

const VideoList: React.FC<VideoListProps> = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Detailed Video Analysis</h3>
      
      {categories.map((category) => (
        <div key={category.name} className="bg-gray-800/50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleCategory(category.name)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold">{category.name}</span>
              <span className="text-sm text-gray-400">
                {category.videos.length} videos
              </span>
            </div>
            {expandedCategories.includes(category.name) ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {expandedCategories.includes(category.name) && (
            <div className="px-6 pb-4">
              <div className="space-y-4">
                {category.videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{video.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{video.views.toLocaleString()} views</span>
                          <span>{video.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoList;