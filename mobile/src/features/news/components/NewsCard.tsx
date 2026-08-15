import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bookmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatArticleDate } from '../../../utils/date';
import { useBookmarksStore } from '../../../store/bookmarks.store';

interface Article {
  id: string;
  title: string;
  image?: string | null;
  source?: string | null;
  published_at?: string | null;
}

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const router = useRouter();
  const { bookmarks, toggleBookmark: toggleStoreBookmark } = useBookmarksStore();
  const isBookmarked = bookmarks.some((b: any) => b.id === article.id);

  const toggleBookmark = () => {
    toggleStoreBookmark(article as any);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/article?id=${article.id}` as any)}
      className="flex-row items-center mb-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl p-3 shadow-sm border border-border-light dark:border-border-dark"
    >
      <Image
        source={{ uri: article.image || 'https://via.placeholder.com/150' }}
        className="w-24 h-24 rounded-lg bg-gray-200"
      />
      <View className="flex-1 ml-4 justify-between min-h-[96px]">
        <Text
          numberOfLines={3}
          className="text-body-large font-inter font-bold text-text-primary dark:text-white"
        >
          {article.title}
        </Text>
        
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center flex-1">
            <Text className="text-body-small font-inter text-text-secondary dark:text-gray-400" numberOfLines={1}>
              {article.source || 'News'}
            </Text>
            <Text className="text-body-small font-inter text-text-secondary dark:text-gray-400 mx-1">•</Text>
            <Text className="text-body-small font-inter text-text-secondary dark:text-gray-400">
              {formatArticleDate(article.published_at || undefined)}
            </Text>
          </View>
          
          <TouchableOpacity onPress={toggleBookmark} className="p-1">
            <Bookmark size={18} color={isBookmarked ? '#2563EB' : '#9CA3AF'} fill={isBookmarked ? '#2563EB' : 'transparent'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
