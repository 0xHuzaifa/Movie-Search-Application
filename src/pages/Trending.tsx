import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { useInfiniteSearch } from '@/hooks/useInfiniteSearch';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { MovieGrid } from '@/components/MovieGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Trending: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteSearch('', 'trending');

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref } = useIntersectionObserver(loadMore);

  const movies = data?.pages.flatMap(page => page.results) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load trending movies</h2>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="hero-gradient p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold glow-text">Trending Movies</h1>
              <p className="text-muted-foreground">
                Discover what's popular this week
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hidden sm:flex"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MovieGrid movies={movies} />
        
        {/* Load more trigger */}
        {hasNextPage && (
          <div ref={ref} className="flex justify-center py-8">
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        )}

        {!hasNextPage && movies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-muted-foreground">That's all the trending movies for now!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};