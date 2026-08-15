import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useResetPassword } from '../../features/auth/hooks/useAuth';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  
  const resetMutation = useResetPassword();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark justify-center p-6">
      <View className="mb-10">
        <Text className="text-h1 font-inter font-bold text-primary mb-2">New Password</Text>
        <Text className="text-body-large font-inter text-text-secondary dark:text-gray-400">
          Enter your reset token and your new password.
        </Text>
      </View>

      {resetMutation.isSuccess ? (
        <View className="flex-1 justify-center items-center">
          <View className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-xl">
            <Text className="text-green-600 font-inter text-body-medium">
              Your password has been successfully reset!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            className="p-4 rounded-xl items-center justify-center bg-primary w-full"
          >
            <Text className="text-white font-inter font-bold text-body-large">Go to Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {resetMutation.isError && (
            <View className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl">
              <Text className="text-red-600 font-inter text-body-medium">
                Failed to reset password. Invalid or expired token.
              </Text>
            </View>
          )}

          <View className="space-y-4 mb-8">
            <View>
              <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2">Reset Token</Text>
              <TextInput
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
                className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter"
                placeholder="Enter reset token"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View>
              <Text className="text-body-medium font-inter font-bold text-text-primary dark:text-white mb-2 mt-4">New Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="p-4 bg-background-alt-light dark:bg-background-alt-dark rounded-xl border border-border-light dark:border-border-dark text-text-primary dark:text-white font-inter"
                placeholder="Create a new password"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => resetMutation.mutate({ token, new_password: password })}
            disabled={resetMutation.isPending || !token || !password}
            className={`p-4 rounded-xl items-center justify-center ${
              (token && password && !resetMutation.isPending) ? 'bg-primary' : 'bg-primary/50'
            }`}
          >
            {resetMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-inter font-bold text-body-large">Reset Password</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
