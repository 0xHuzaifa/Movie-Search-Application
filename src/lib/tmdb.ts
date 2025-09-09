import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Free TMDB API key for demo purposes - in production, this should be server-side
const TMDB_API_KEY = '4e44d9029b1270a757cddc766a1bcb63';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Configure axios instance
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  timeout: 10000,
});

// API functions
export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getPopularMovies = async (page: number = 1): Promise<SearchResponse> => {
  const response = await tmdbApi.get('/movie/popular', {
    params: {
      page,
    },
  });
  return response.data;
};

export const getTrendingMovies = async (page: number = 1): Promise<SearchResponse> => {
  const response = await tmdbApi.get('/trending/movie/week', {
    params: {
      page,
    },
  });
  return response.data;
};

// Image URL helpers
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = 'w1280'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};