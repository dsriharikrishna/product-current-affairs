import { create } from 'zustand';
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { NewsArticle } from '../features/news/types';

const storage = createMMKV({
  id: 'bookmarks-storage',
});

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

interface BookmarksState {
  bookmarks: NewsArticle[];
  toggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (articleId: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (article) => {
        const { bookmarks } = get();
        const exists = bookmarks.some((b) => b.id === article.id);
        if (exists) {
          set({ bookmarks: bookmarks.filter((b) => b.id !== article.id) });
        } else {
          set({ bookmarks: [article, ...bookmarks] });
        }
      },
      isBookmarked: (articleId) => {
        return get().bookmarks.some((b) => b.id === articleId);
      },
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'news-bookmarks',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
