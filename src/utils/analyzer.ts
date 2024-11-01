// Types for our video data
export interface Video {
  id: string;
  title: string;
  views: number;
  date: string;
  thumbnail: string;
}

export interface VideoCategory {
  name: string;
  videos: Video[];
}

// Mock data for demonstration
const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'How to Start an Etsy Shop in 2024',
    views: 15000,
    date: '2024-02-15',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    title: 'Etsy SEO Tips That Actually Work',
    views: 12000,
    date: '2024-02-10',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    title: 'Google SEO Ranking Secrets',
    views: 8500,
    date: '2024-02-05',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop',
  },
  {
    id: '4',
    title: 'Product Photography for Etsy',
    views: 5000,
    date: '2024-01-30',
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=450&fit=crop',
  },
  {
    id: '5',
    title: 'Local SEO Guide 2024',
    views: 7500,
    date: '2024-01-25',
    thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=450&fit=crop',
  },
];

// Function to categorize videos based on their titles
const categorizeVideos = (videos: Video[]): VideoCategory[] => {
  // Define category keywords
  const categories: { [key: string]: string[] } = {
    'Etsy Business': ['etsy', 'shop', 'product'],
    'SEO & Marketing': ['seo', 'ranking', 'google'],
    'Content Creation': ['photography', 'video', 'content'],
  };

  // Initialize categories with empty video arrays
  const categorizedVideos: { [key: string]: Video[] } = {};
  Object.keys(categories).forEach(category => {
    categorizedVideos[category] = [];
  });

  // Categorize each video
  videos.forEach(video => {
    const lowercaseTitle = video.title.toLowerCase();
    
    // Find matching category
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowercaseTitle.includes(keyword))) {
        categorizedVideos[category].push(video);
        break;
      }
    }
  });

  // Convert to array format and sort videos by views
  return Object.entries(categorizedVideos)
    .filter(([_, videos]) => videos.length > 0)
    .map(([name, videos]) => ({
      name,
      videos: videos.sort((a, b) => b.views - a.views),
    }))
    .sort((a, b) => b.videos.length - a.videos.length);
};

// Main analysis function
export const analyzeChannel = async (channelUrl: string): Promise<VideoCategory[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would:
  // 1. Call YouTube API to get channel ID from URL
  // 2. Fetch last 50 videos
  // 3. Filter videos with >1000 views
  // 4. Categorize the videos
  
  return categorizeVideos(MOCK_VIDEOS);
};