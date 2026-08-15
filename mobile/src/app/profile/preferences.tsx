import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useColorScheme } from 'nativewind';
import { usePreferences, useUpdatePreferences } from '../../features/users/hooks/useUsers';

export default function PreferencesScreen() {
  const { data: pref, isLoading } = usePreferences();
  const { mutate: updatePref } = useUpdatePreferences();
  const { setColorScheme } = useColorScheme();

  if (isLoading) {
    return <ActivityIndicator size="large" className="m-auto text-primary" />;
  }

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    updatePref({ theme });
    setColorScheme(theme);
  };

  const currentTheme = pref?.theme || 'system';

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark p-4 pt-8">
      <Text className="text-body-large font-inter font-medium text-text-secondary dark:text-gray-400 mb-4">App Theme</Text>
      <View className="bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
        {['system', 'light', 'dark'].map((t, i) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTheme(t as any)}
            className={`flex-row items-center justify-between p-4 ${
              i !== 2 ? 'border-b border-border-light dark:border-border-dark' : ''
            }`}
          >
            <Text className="text-body-large font-inter font-medium text-text-primary dark:text-white capitalize">{t}</Text>
            {currentTheme === t && (
              <View className="w-4 h-4 rounded-full bg-primary" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
