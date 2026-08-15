import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUser, useUpdateUser } from '../../features/users/hooks/useUsers';

export default function AccountScreen() {
  const { data: user, isLoading } = useUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [name, setName] = useState('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  if (isLoading) {
    return <ActivityIndicator size="large" className="m-auto text-primary" />;
  }

  const hasChanges = name !== user?.name;

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark p-4 pt-8">
      <View className="mb-6">
        <Text className="text-body-large font-inter font-medium text-text-secondary dark:text-gray-400 mb-2">Email Address</Text>
        <View className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark opacity-50">
          <Text className="text-body-large font-inter text-text-primary dark:text-white">{user?.email}</Text>
        </View>
        <Text className="text-body-small text-text-disabled mt-1">Email cannot be changed.</Text>
      </View>

      <View className="mb-8">
        <Text className="text-body-large font-inter font-medium text-text-secondary dark:text-gray-400 mb-2">Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter text-body-large"
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity
        onPress={() => updateUser({ name })}
        disabled={!hasChanges || isPending}
        className={`p-4 rounded-xl items-center justify-center ${
          hasChanges && !isPending ? 'bg-primary' : 'bg-primary/50'
        }`}
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-inter font-bold text-body-large">Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
