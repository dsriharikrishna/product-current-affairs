import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';
import { useSignup } from '../../features/auth/hooks/useAuth';

export default function SignupScreen() {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useSignup();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark justify-center p-6">
      <View className="mb-10">
        <Text className="text-h1 font-inter font-bold text-primary mb-2">Create Account</Text>
        <Text className="text-body-large font-inter text-text-secondary dark:text-gray-400">
          Join us to get your personalized news experience.
        </Text>
      </View>

      {registerMutation.isError && (
        <View className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl">
          <Text className="text-red-600 font-inter text-body-medium">
            Registration failed. Email might be taken.
          </Text>
        </View>
      )}

      <View className="space-y-4 mb-8">
        <View>
          <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter"
            placeholder="John Doe"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2 mt-4">Email Address</Text>
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
            placeholder="Create a strong password"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => registerMutation.mutate({ email, password, name })}
        disabled={registerMutation.isPending || !email || !password || !name}
        className={`p-4 rounded-xl items-center justify-center mb-6 ${
          (email && password && name && !registerMutation.isPending) ? 'bg-primary' : 'bg-primary/50'
        }`}
      >
        {registerMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-inter font-bold text-body-large">Sign Up</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center justify-center">
        <Text className="text-text-secondary dark:text-gray-400 font-inter text-body-large">
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary font-inter font-bold text-body-large">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
