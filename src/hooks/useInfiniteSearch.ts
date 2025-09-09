import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMovies, getPopularMovies, getTrendingMovies, SearchResponse } from '@/lib/tmdb';

export const useInfiniteSearch = (query: string, searchType: 'search' | 'popular' | 'trending' = 'popular') => {
  return useInfiniteQuery({
    queryKey: ['movies', searchType, query],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      if (searchType === 'search' && query) {
        return searchMovies(query, pageParam);
      } else if (searchType === 'trending') {
        return getTrendingMovies(pageParam);
      } else {
        return getPopularMovies(pageParam);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: SearchResponse) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: searchType !== 'search' || Boolean(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};