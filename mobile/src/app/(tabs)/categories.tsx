import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Globe, Cpu, Briefcase, Heart, Trophy, Film, Hash, ChevronRight } from 'lucide-react-native';
import { useCategories } from '../../features/news/hooks/useNews';


import { router } from 'expo-router';

const CATEGORY_META: Record<string, { icon: any, color: string }> = {
  'world': { icon: Globe, color: '#3B82F6' },
  'technology': { icon: Cpu, color: '#8B5CF6' },
  'tech': { icon: Cpu, color: '#8B5CF6' },
  'business': { icon: Briefcase, color: '#10B981' },
  'health': { icon: Heart, color: '#EF4444' },
  'sports': { icon: Trophy, color: '#F59E0B' },
  'entertainment': { icon: Film, color: '#EC4899' },
  'national': { icon: Globe, color: '#F97316' },
};

export default function CategoriesScreen() {
  const { data: categories, isLoading, isError } = useCategories();
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12">
      <View className="px-4 mb-4">
        <Text className="text-h1 font-inter font-bold text-primary">Categories</Text>
        <Text className="text-body-medium font-inter text-text-secondary mt-1">
          Explore news by topics
        </Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-body-large text-text-secondary">Failed to load categories.</Text>
          </View>
        ) : (
          <View className="flex-col">
            {categories?.map((category) => {
              const normalizedName = category.name.toLowerCase();
              const meta = CATEGORY_META[normalizedName] || { icon: Hash, color: '#6B7280' };
              const Icon = meta.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/category/${normalizedName}` as any)}
                  className="flex-row items-center bg-background-alt-light dark:bg-background-alt-dark rounded-2xl p-4 mb-3 border border-border-light dark:border-border-dark shadow-sm"
                >
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: `${meta.color}20` }}
                  >
                    <Icon size={24} color={meta.color} />
                  </View>
                  <Text className="flex-1 text-body-large font-inter font-bold text-text-primary">
                    {category.name}
                  </Text>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
