const NEWS_ENDPOINTS = {
  LATEST: '/news/latest',
  INDIA_LATEST: '/news/india/latest',
  CATEGORIES: '/categories',
  SEARCH: '/news/search',
  INDIA_SEARCH: '/news/india/search',
  BREAKING: '/news/breaking',
  ARTICLE_DETAIL: (id: string) => `/news/article/${id}`,
  CATEGORY_DETAIL: (category: string) => `/news/category/${category}`,
  INDIA_CATEGORY_DETAIL: (category: string) => `/news/india/category/${category}`,
};

export default NEWS_ENDPOINTS;
