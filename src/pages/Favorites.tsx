import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { MovieGrid } from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

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
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold glow-text">My Favorites</h1>
              <p className="text-muted-foreground">
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your collection
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
      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-16"
        >
          <div className="hero-gradient p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start exploring movies and add them to your favorites by clicking the heart icon on any movie card.
          </p>
          <Button onClick={() => navigate('/')} className="hero-gradient text-white">
            Discover Movies
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MovieGrid movies={favorites} />
        </motion.div>
      )}
    </div>
  );
};