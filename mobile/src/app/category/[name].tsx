import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useCategoryNews } from '../../features/news/hooks/useNews';
import { NewsCard } from '../../features/news/components/NewsCard';

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const { data: news, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategoryNews(name || '');

  const articles = news?.pages.flatMap((page) => page.data) || [];

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12 px-4">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2 -ml-2">
          <ChevronLeft size={28} className="text-text-primary dark:text-white" />
        </TouchableOpacity>
        <Text className="text-h1 font-inter font-bold text-primary capitalize">
          {name}
        </Text>
      </View>

      {isLoading && articles.length === 0 ? (
        <ActivityIndicator size="large" color="#2563EB" className="flex-1" />
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-large text-red-500 font-inter text-center">
            Failed to load category news.
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <NewsCard article={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="small" color="#2563EB" className="my-4" /> : null
          }
        />
      )}
    </View>
  );
}
