import apiService from '../../../services/apiService';
import NEWS_ENDPOINTS from '../services/newsEndpoints';
import { NewsResponse, Category } from '../types';

export const fetchLatestNews = async (cursor?: string): Promise<NewsResponse> => {
  const url = cursor ? `${NEWS_ENDPOINTS.LATEST}?cursor=${cursor}` : NEWS_ENDPOINTS.LATEST;
  return await apiService.get<NewsResponse>(url);
};

export const fetchIndiaNews = async (cursor?: string): Promise<NewsResponse> => {
  const url = cursor ? `${NEWS_ENDPOINTS.INDIA_LATEST}?cursor=${cursor}` : NEWS_ENDPOINTS.INDIA_LATEST;
  return await apiService.get<NewsResponse>(url);
};

export const fetchCategoryNews = async (category: string, cursor?: string): Promise<NewsResponse> => {
  let url = '';
  if (typeof NEWS_ENDPOINTS.CATEGORY_DETAIL === 'function') {
    url = NEWS_ENDPOINTS.CATEGORY_DETAIL(category);
  }
  url = cursor ? `${url}?cursor=${cursor}` : url;
  return await apiService.get<NewsResponse>(url);
};

export const fetchIndiaCategoryNews = async (category: string, cursor?: string): Promise<NewsResponse> => {
  let url = '';
  if (typeof NEWS_ENDPOINTS.INDIA_CATEGORY_DETAIL === 'function') {
    url = NEWS_ENDPOINTS.INDIA_CATEGORY_DETAIL(category);
  }
  url = cursor ? `${url}?cursor=${cursor}` : url;
  return await apiService.get<NewsResponse>(url);
};

export const fetchBreakingNews = async (): Promise<NewsResponse> => {
  return await apiService.get<NewsResponse>(NEWS_ENDPOINTS.BREAKING);
};

export const fetchSearchNews = async (query: string): Promise<NewsResponse> => {
  return await apiService.get<NewsResponse>(`${NEWS_ENDPOINTS.SEARCH}?keywords=${encodeURIComponent(query)}`);
};

export const fetchIndiaSearchNews = async (query: string): Promise<NewsResponse> => {
  return await apiService.get<NewsResponse>(`${NEWS_ENDPOINTS.INDIA_SEARCH}?keywords=${encodeURIComponent(query)}`);
};

export const fetchArticleDetail = async (id: string): Promise<any> => {
  if (typeof NEWS_ENDPOINTS.ARTICLE_DETAIL === 'function') {
    return await apiService.get<any>(NEWS_ENDPOINTS.ARTICLE_DETAIL(id));
  }
  return await apiService.get<any>(`${NEWS_ENDPOINTS.ARTICLE_DETAIL}/${id}`);
};

export const fetchCategories = async (): Promise<Category[]> => {
  // Try to use the standard response format if backend wraps it, 
  // otherwise fallback to raw array if it returns the array directly.
  try {
    const res = await apiService.get<any>(NEWS_ENDPOINTS.CATEGORIES);
    if (res && res.data && Array.isArray(res.data)) {
      return res.data;
    }
    if (Array.isArray(res)) {
      return res;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
