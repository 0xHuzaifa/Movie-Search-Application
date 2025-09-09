import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, Calendar, Clock, DollarSign } from 'lucide-react';
import { getMovieDetails, getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Backdrop */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getBackdropUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Back button */}
        <Button
          variant="ghost"
          className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="movie-card overflow-hidden">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and favorite */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-muted-foreground text-lg">
                    {movie.original_title}
                  </p>
                )}
              </div>
              <Button
                variant={isFavorite(movie.id) ? "default" : "outline"}
                className={isFavorite(movie.id) ? "bg-cinema-red hover:bg-cinema-red/90" : ""}
                onClick={() => toggleFavorite(movie)}
              >
                <Heart 
                  className={`h-4 w-4 mr-2 ${isFavorite(movie.id) ? 'fill-current' : ''}`} 
                />
                {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm">
              {movie.release_date && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(movie.release_date).getFullYear()}
                </div>
              )}
              {movie.runtime && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatRuntime(movie.runtime)}
                </div>
              )}
              {movie.vote_average > 0 && (
                <div className="flex items-center text-muted-foreground">
                  <Star className="h-4 w-4 mr-1 fill-cinema-gold text-cinema-gold" />
                  {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Budget and Revenue */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movie.budget > 0 && (
                  <Card className="p-4">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Budget
                    </div>
                    <p className="text-lg font-semibold">
                      {formatCurrency(movie.budget)}
                    </p>
                  </Card>
                )}
                {movie.revenue > 0 && (
                  <Card className="p-4">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Revenue
                    </div>
                    <p className="text-lg font-semibold">
                      {formatCurrency(movie.revenue)}
                    </p>
                  </Card>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};