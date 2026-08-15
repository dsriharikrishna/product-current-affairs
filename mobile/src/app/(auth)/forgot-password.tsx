import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useForgotPassword } from '../../features/auth/hooks/useAuth';
import { ChevronLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  
  const forgotMutation = useForgotPassword();

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark p-6 pt-12">
      <TouchableOpacity onPress={() => router.back()} className="mb-6 -ml-2 p-2">
        <ChevronLeft size={28} className="text-text-primary dark:text-white" />
      </TouchableOpacity>

      <View className="mb-10">
        <Text className="text-h1 font-inter font-bold text-primary mb-2">Reset Password</Text>
        <Text className="text-body-large font-inter text-text-secondary dark:text-gray-400">
          Enter your email and we'll send you a link to reset your password.
        </Text>
      </View>

      {forgotMutation.isSuccess && (
        <View className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-xl">
          <Text className="text-green-600 font-inter text-body-medium">
            Reset link sent! Please check your email.
          </Text>
        </View>
      )}

      {forgotMutation.isError && (
        <View className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl">
          <Text className="text-red-600 font-inter text-body-medium">
            Failed to send reset link. Please try again.
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
      </View>

      <TouchableOpacity
        onPress={() => forgotMutation.mutate(email)}
        disabled={forgotMutation.isPending || !email || forgotMutation.isSuccess}
        className={`p-4 rounded-xl items-center justify-center ${
          (email && !forgotMutation.isPending && !forgotMutation.isSuccess) ? 'bg-primary' : 'bg-primary/50'
        }`}
      >
        {forgotMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-inter font-bold text-body-large">Send Reset Link</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
