import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/lib/tmdb';
import { MovieCard } from './MovieCard';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieGridProps {
  movies: Movie[];
  className?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, className = "" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (movies.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-lg text-muted-foreground">No movies found</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={toggleFavorite}
          index={index}
        />
      ))}
    </motion.div>
  );
};