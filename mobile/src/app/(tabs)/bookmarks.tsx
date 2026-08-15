import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useBookmarksStore } from '../../store/bookmarks.store';
import { NewsCard } from '../../features/news/components/NewsCard';

export default function BookmarksScreen() {
  const { bookmarks } = useBookmarksStore();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12 px-4">
      <View className="mb-6">
        <Text className="text-h1 font-inter font-bold text-primary">Bookmarks</Text>
        <Text className="text-body-medium font-inter text-text-secondary mt-1">
          Your saved articles
        </Text>
      </View>

      {bookmarks.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-h3 font-inter font-bold text-text-secondary mb-2 text-center">
            No bookmarks yet
          </Text>
          <Text className="text-body-medium font-inter text-text-secondary text-center px-4">
            Save articles you want to read later by tapping the bookmark icon on any news card.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewsCard article={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
