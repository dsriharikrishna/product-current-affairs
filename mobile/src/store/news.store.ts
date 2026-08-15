import { create } from 'zustand';
import { NewsArticle } from '../features/news/types';

interface NewsState {
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  selectedArticle: null,
  setSelectedArticle: (article) => set({ selectedArticle: article }),
}));
