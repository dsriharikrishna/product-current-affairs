import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { useLogin } from '../../features/auth/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark justify-center p-6">
      <View className="mb-10">
        <Text className="text-h1 font-inter font-bold text-primary mb-2">Welcome Back</Text>
        <Text className="text-body-large font-inter text-text-secondary dark:text-gray-400">
          Sign in to access your personalized news feed and saved articles.
        </Text>
      </View>

      {loginMutation.isError && (
        <View className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl">
          <Text className="text-red-600 font-inter text-body-medium">
            Invalid email or password. Please try again.
          </Text>
        </View>
      )}

      <View className="space-y-4 mb-8">
        <View>
          <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2">Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter"
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2 mt-4">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter"
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => loginMutation.mutate({ username: email, password })}
        disabled={loginMutation.isPending || !email || !password}
        className={`p-4 rounded-xl items-center justify-center mb-6 ${
          (email && password && !loginMutation.isPending) ? 'bg-primary' : 'bg-primary/50'
        }`}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-inter font-bold text-body-large">Sign In</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center justify-center">
        <Text className="text-text-secondary dark:text-gray-400 font-inter text-body-large">
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text className="text-primary font-inter font-bold text-body-large">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
