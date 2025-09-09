import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Calendar } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  index: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  isFavorite, 
  onToggleFavorite, 
  index 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
    >
      <Card 
        className="movie-card overflow-hidden border-0 relative"
        onClick={handleCardClick}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite button */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite 
                ? 'bg-cinema-red/20 text-cinema-red hover:bg-cinema-red/30' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-200 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </Button>

          {/* Rating badge */}
          {movie.vote_average > 0 && (
            <Badge 
              variant="secondary"
              className="absolute top-2 left-2 bg-black/50 text-white backdrop-blur-sm border-0"
            >
              <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold mr-1" />
              {formatRating(movie.vote_average)}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {movie.title}
            </h3>
            
            {movie.release_date && (
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(movie.release_date)}
              </div>
            )}
          </div>

          {movie.overview && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};