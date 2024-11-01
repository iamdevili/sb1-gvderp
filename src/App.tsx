import React, { useState } from 'react';
import { Search, BarChart2, Youtube } from 'lucide-react';
import VideoList from './components/VideoList';
import { analyzeChannel, type VideoCategory } from './utils/analyzer';
import CategoryCard from './components/CategoryCard';

function App() {
  const [channelUrl, setChannelUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      const results = await analyzeChannel(channelUrl);
      setCategories(results);
    } catch (err) {
      setError('Error analyzing channel. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Youtube className="h-8 w-8 text-red-500" />
              <h1 className="text-xl font-bold">YouTube Analytics Pro</h1>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-gray-400" />
              <span className="text-sm text-gray-400">Video Performance Analyzer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="Enter YouTube channel URL"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 text-white placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing Channel...
                </>
              ) : (
                <>
                  <BarChart2 className="h-5 w-5" />
                  Analyze Channel
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {categories.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8">Analysis Results</h2>
            
            {/* Category Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>

            {/* Detailed Video List */}
            <VideoList categories={categories} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;