import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useSearchNews } from '../../features/news/hooks/useNews';
import { NewsCard } from '../../features/news/components/NewsCard';

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data: searchResults, isLoading, isError } = useSearchNews(debouncedQuery);

  const articles = searchResults?.data || [];
  const showLoading = isLoading && debouncedQuery.length > 2;

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12 px-4">
      <View className="mb-4">
        <Text className="text-h1 font-inter font-bold text-primary mb-4">Search</Text>
        
        <View className="flex-row items-center bg-background-alt-light dark:bg-background-alt-dark rounded-xl px-4 py-2 border border-border-light dark:border-border-dark">
          <SearchIcon size={20} color="#9CA3AF" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for news, topics, or authors..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-body-large font-inter text-text-primary dark:text-white h-10"
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showLoading ? (
        <ActivityIndicator size="large" color="#2563EB" className="mt-8" />
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-large text-red-500 font-inter text-center">
            Failed to search. Please try again later.
          </Text>
        </View>
      ) : debouncedQuery.length > 2 && articles.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-large text-text-secondary font-inter text-center">
            No results found for "{debouncedQuery}"
          </Text>
        </View>
      ) : debouncedQuery.length <= 2 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-body-large text-text-secondary font-inter text-center">
            Type at least 3 characters to search.
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewsCard article={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
