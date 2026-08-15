import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
import { formatArticleDate } from '../../../utils/date';

interface Article {
  id: string;
  title: string;
  image?: string | null;
  source?: string | null;
  published_at?: string | null;
}

interface BreakingNewsCardProps {
  article: Article;
}

export function BreakingNewsCard({ article }: BreakingNewsCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/article?id=${article.id}` as any)}
      className="mb-6 rounded-2xl overflow-hidden shadow-lg h-64 border border-border-light dark:border-border-dark"
    >
      <ImageBackground
        source={{ uri: article.image || 'https://via.placeholder.com/400' }}
        className="w-full h-full"
        resizeMode="cover"
      >
        <View
          className="absolute w-full h-full bg-black/50"
        />
        <View className="absolute bottom-0 w-full p-4">
          <View className="bg-red-600 self-start px-2 py-1 rounded mb-2">
            <Text className="text-white text-[10px] font-inter font-bold uppercase tracking-wider">Breaking</Text>
          </View>
          <Text
            numberOfLines={3}
            className="text-h2 font-inter font-bold text-white mb-2"
          >
            {article.title}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-body-small font-inter text-gray-300">
              {article.source || 'News'}
            </Text>
            <Text className="text-body-small font-inter text-gray-300 mx-2">•</Text>
            <Text className="text-body-small font-inter text-gray-300">
              {formatArticleDate(article.published_at || undefined)}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
