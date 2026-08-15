import React, { useState } from 'react';
import { View, Text, Switch, ActivityIndicator } from 'react-native';
import { usePreferences, useUpdatePreferences } from '../../features/users/hooks/useUsers';

export default function NotificationsScreen() {
  const { data: pref, isLoading } = usePreferences();
  const { mutate: updatePref, isPending } = useUpdatePreferences();

  if (isLoading) {
    return <ActivityIndicator size="large" className="m-auto text-primary" />;
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark p-4 pt-8">
      <View className="flex-row items-center justify-between p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark">
        <View>
          <Text className="text-body-large font-inter font-semibold text-text-primary dark:text-white">Push Notifications</Text>
          <Text className="text-body-medium font-inter text-text-secondary dark:text-gray-400 mt-1">Receive daily news alerts</Text>
        </View>
        <Switch
          trackColor={{ false: '#9CA3AF', true: '#60A5FA' }}
          thumbColor={pref?.notification_enabled ? '#2563EB' : '#F3F4F6'}
          onValueChange={(val) => updatePref({ notification_enabled: val })}
          value={pref?.notification_enabled ?? false}
          disabled={isPending}
        />
      </View>
    </View>
  );
}
