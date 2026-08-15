import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchLatestNews, fetchIndiaNews, fetchCategories, fetchSearchNews, fetchIndiaSearchNews, fetchBreakingNews, fetchArticleDetail, fetchCategoryNews, fetchIndiaCategoryNews } from '../api/queries';

export const useLatestNews = () => {
  return useInfiniteQuery({
    queryKey: ['news', 'latest'],
    queryFn: ({ pageParam = undefined }) => fetchLatestNews(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useIndiaNews = () => {
  return useInfiniteQuery({
    queryKey: ['news', 'india', 'latest'],
    queryFn: ({ pageParam = undefined }) => fetchIndiaNews(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategoryNews = (category: string, isTabActive: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ['news', 'category', category],
    queryFn: ({ pageParam = undefined }) => fetchCategoryNews(category, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
    enabled: !!category && isTabActive,
    staleTime: 5 * 60 * 1000,
  });
};

export const useIndiaCategoryNews = (category: string, isTabActive: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ['news', 'india', 'category', category],
    queryFn: ({ pageParam = undefined }) => fetchIndiaCategoryNews(category, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
    enabled: !!category && isTabActive,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBreakingNews = () => {
  return useQuery({
    queryKey: ['news', 'breaking'],
    queryFn: fetchBreakingNews,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours, categories rarely change
  });
};

export const useSearchNews = (query: string, isTabActive: boolean = true) => {
  return useQuery({
    queryKey: ['news', 'search', query],
    queryFn: () => fetchSearchNews(query),
    enabled: query.length > 2 && isTabActive,
    staleTime: 5 * 60 * 1000,
  });
};

export const useIndiaSearchNews = (query: string, isTabActive: boolean = true) => {
  return useQuery({
    queryKey: ['news', 'india', 'search', query],
    queryFn: () => fetchIndiaSearchNews(query),
    enabled: query.length > 2 && isTabActive,
    staleTime: 5 * 60 * 1000,
  });
};

export const useArticleDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['news', 'article', id],
    queryFn: () => fetchArticleDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
