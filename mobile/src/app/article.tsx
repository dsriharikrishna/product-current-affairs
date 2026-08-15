import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, Linking, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ExternalLink, Bookmark, Share2 } from 'lucide-react-native';
import { useArticleDetail } from '../features/news/hooks/useNews';
import { useBookmarksStore } from '../store/bookmarks.store';
import { formatArticleDate } from '../utils/date';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { data: article, isLoading, isError } = useArticleDetail(id);
  const { bookmarks, toggleBookmark: toggleStoreBookmark } = useBookmarksStore();
  
  const isBookmarked = bookmarks.some((b: any) => b.id === id);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (isError || !article) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center p-4">
        <Text className="text-h3 font-inter font-bold text-text-primary dark:text-white mb-4 text-center">
          Article Not Found
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 bg-primary rounded-xl">
          <Text className="text-white font-inter font-bold text-body-large">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleBookmark = () => {
    toggleStoreBookmark(article as any);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Read this article: ${article.title}\n\n${article.source_url || ''}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <View className="absolute top-0 z-10 w-full flex-row justify-between items-center px-4 pt-12 pb-2 bg-background-light/90 dark:bg-background-dark/90">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-background-alt-light dark:bg-background-alt-dark rounded-full shadow-sm">
          <ChevronLeft size={24} className="text-text-primary dark:text-white" />
        </TouchableOpacity>
        
        <View className="flex-row">
          <TouchableOpacity onPress={handleShare} className="p-2 mr-2 bg-background-alt-light dark:bg-background-alt-dark rounded-full shadow-sm">
            <Share2 size={24} className="text-text-primary dark:text-white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmark} className="p-2 bg-background-alt-light dark:bg-background-alt-dark rounded-full shadow-sm">
            <Bookmark size={24} color={isBookmarked ? '#2563EB' : '#9CA3AF'} fill={isBookmarked ? '#2563EB' : 'transparent'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: article.image || 'https://via.placeholder.com/600' }}
          className="w-full h-72 bg-gray-200"
        />
        
        <View className="p-4 -mt-6 bg-background-light dark:bg-background-dark rounded-t-3xl">
          <View className="flex-row items-center mb-4">
            <View className="px-3 py-1 bg-primary/10 rounded-full mr-3">
              <Text className="text-primary font-inter font-bold text-body-small capitalize">
                {article.category || 'News'}
              </Text>
            </View>
            <Text className="text-text-secondary dark:text-gray-400 font-inter text-body-small">
              {formatArticleDate(article.published_at as any)}
            </Text>
          </View>
          
          <Text className="text-h1 font-inter font-bold text-text-primary dark:text-white mb-4 leading-tight">
            {article.title}
          </Text>
          
          <View className="flex-row items-center mb-6 pb-6 border-b border-border-light dark:border-border-dark">
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold font-inter">
                {article.source ? article.source.substring(0, 1).toUpperCase() : 'N'}
              </Text>
            </View>
            <View>
              <Text className="text-body-large font-inter font-bold text-text-primary dark:text-white">
                {article.source || 'News Source'}
              </Text>
              <Text className="text-body-small font-inter text-text-secondary dark:text-gray-400">
                {article.author || 'Author Unknown'}
              </Text>
            </View>
          </View>
          
          {article.description && (
            <Text className="text-h3 font-inter font-medium text-text-secondary dark:text-gray-300 mb-6 italic leading-relaxed">
              {article.description}
            </Text>
          )}

          <Text className="text-body-large font-inter text-text-primary dark:text-white leading-loose mb-8">
            {article.full_content || article.content || 'Full content is not available for this article.'}
          </Text>
          
          {article.source_url && (
            <TouchableOpacity
              onPress={() => Linking.openURL(article.source_url as string)}
              className="flex-row items-center justify-center bg-background-alt-light dark:bg-background-alt-dark p-4 rounded-xl border border-border-light dark:border-border-dark mb-12"
            >
              <Text className="text-primary font-inter font-bold text-body-large mr-2">Read Original Article</Text>
              <ExternalLink size={20} color="#2563EB" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
