import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { useUser } from '../../features/users/hooks/useUsers';
import { LogOut, User, Settings, Bell, CircleHelp } from 'lucide-react-native';

const MENU_ITEMS = [
  { id: 'account', label: 'Account Settings', icon: User, route: '/profile/account' },
  { id: 'notifications', label: 'Notifications', icon: Bell, route: '/profile/notifications' },
  { id: 'preferences', label: 'Preferences', icon: Settings, route: '/profile/preferences' },
  { id: 'help', label: 'Help & Support', icon: CircleHelp, route: '/profile/help' },
];

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark pt-12">
      <View className="px-4 mb-8">
        <Text className="text-h1 font-inter font-bold text-primary mb-6">Profile</Text>

        <View className="flex-row items-center mb-8 bg-background-alt-light dark:bg-background-alt-dark p-4 rounded-2xl border border-border-light dark:border-border-dark">
          <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mr-4">
            <Text className="text-white text-h2 font-bold font-inter">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
            </Text>
          </View>
          <View>
            <Text className="text-h3 font-inter font-bold text-text-primary dark:text-white">
              {isLoading ? 'Loading...' : user?.name || 'John Doe'}
            </Text>
            <Text className="text-body-medium font-inter text-text-secondary dark:text-gray-400">
              {isLoading ? '...' : user?.email || 'john.doe@example.com'}
            </Text>
          </View>
        </View>

        <View className="space-y-4 mb-8">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(item.route as any)}
                className="flex-row items-center justify-between p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark"
              >
                <View className="flex-row items-center">
                  <Icon size={20} className="text-text-secondary dark:text-gray-400 mr-3" />
                  <Text className="text-body-large font-inter font-medium text-text-primary dark:text-white">{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/50 mt-auto"
        >
          <LogOut size={20} color="#DC2626" className="mr-2" />
          <Text className="text-body-large font-inter font-bold text-red-600">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
