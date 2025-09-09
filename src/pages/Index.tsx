import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Film, Search } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { MovieGrid } from '@/components/MovieGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useInfiniteSearch } from '@/hooks/useInfiniteSearch';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Determine search type based on query
  const searchType = useMemo(() => {
    if (searchQuery.trim()) return 'search';
    return hasSearched ? 'popular' : 'popular';
  }, [searchQuery, hasSearched]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteSearch(searchQuery.trim(), searchType);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref } = useIntersectionObserver(loadMore);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  }, []);

  const movies = data?.pages.flatMap(page => page.results) || [];

  const getTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`;
    }
    return hasSearched ? 'Popular Movies' : 'Popular Movies';
  };

  const getSubtitle = () => {
    if (searchQuery.trim()) {
      return `Found ${data?.pages[0]?.total_results || 0} results`;
    }
    return 'Discover the most popular movies';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {!hasSearched && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 py-16"
        >
          <div className="hero-gradient p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Film className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search through millions of movies, save your favorites, and explore trending content from around the world.
          </p>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for your next favorite movie..."
            className="max-w-2xl mx-auto"
          />
        </motion.div>
      )}

      {/* Search Bar for Searched State */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for movies..."
          />
        </motion.div>
      )}

      {/* Results Header */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
          <p className="text-muted-foreground">{getSubtitle()}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-destructive mb-4">
            <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">
            Failed to load movies. Please try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Movies Grid */}
      {!isLoading && !error && (
        <>
          <MovieGrid movies={movies} />
          
          {/* Load more trigger */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage && <LoadingSpinner />}
            </div>
          )}

          {/* End of results */}
          {!hasNextPage && movies.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-muted-foreground">
                {searchQuery.trim() 
                  ? "That's all we found for your search!" 
                  : "You've seen all the popular movies!"
                }
              </p>
            </motion.div>
          )}

          {/* No results */}
          {movies.length === 0 && hasSearched && searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground">
                Try searching for a different movie or check your spelling.
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
