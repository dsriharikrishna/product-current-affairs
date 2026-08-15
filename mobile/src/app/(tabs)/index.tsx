import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useLatestNews, useBreakingNews } from '../../features/news/hooks/useNews';
import { NewsCard } from '../../features/news/components/NewsCard';
import { BreakingNewsCard } from '../../features/news/components/BreakingNewsCard';

export default function HomeScreen() {
  const { 
    data: latestNews, 
    isLoading: isLatestLoading, 
    isError: isLatestError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchLatest,
    isRefetching
  } = useLatestNews();

  const {
    data: breakingNews,
    isLoading: isBreakingLoading,
    refetch: refetchBreaking
  } = useBreakingNews();

  const onRefresh = React.useCallback(() => {
    refetchLatest();
    refetchBreaking();
  }, [refetchLatest, refetchBreaking]);

  // Flatten the infinite query data pages into a single array
  const articles = latestNews?.pages.flatMap(page => page.data) || [];
  
  // Just use the first breaking news article for the header
  const topBreakingNews = breakingNews?.data?.[0];

  const renderHeader = () => (
    <View className="mb-4">
      <View className="mb-4">
        <Text className="text-h1 font-inter font-bold text-primary">Discover</Text>
        <Text className="text-body-medium font-inter text-text-secondary mt-1">
          News from all over the world
        </Text>
      </View>
      
      {isBreakingLoading ? (
        <ActivityIndicator size="large" color="#2563EB" className="my-8" />
      ) : topBreakingNews ? (
        <View className="mb-6">
          <Text className="text-h3 font-inter font-bold text-text-primary dark:text-white mb-3">Breaking News</Text>
          <BreakingNewsCard article={topBreakingNews} />
        </View>
      ) : null}
      
      <Text className="text-h3 font-inter font-bold text-text-primary dark:text-white mb-3">Latest News</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator size="small" color="#2563EB" className="my-4" />;
  };

  if (isLatestError) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-center p-4">
        <Text className="text-body-large text-red-500 font-inter text-center">
          Failed to load news. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12">
      {isLatestLoading && !articles.length ? (
        <ActivityIndicator size="large" color="#2563EB" className="flex-1" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <NewsCard article={item} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#2563EB" />
          }
        />
      )}
    </View>
  );
}
