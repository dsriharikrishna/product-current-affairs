import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function HelpScreen() {
  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark p-4 pt-8">
      <Text className="text-h2 font-inter font-bold text-text-primary dark:text-white mb-6">Frequently Asked Questions</Text>
      
      <View className="mb-6">
        <Text className="text-body-large font-inter font-bold text-text-primary dark:text-white mb-2">How do I change my news preferences?</Text>
        <Text className="text-body-medium font-inter text-text-secondary dark:text-gray-400">
          You can change your preferred categories by visiting the Categories tab. We are working on adding more detailed preference settings soon!
        </Text>
      </View>
      
      <View className="mb-6">
        <Text className="text-body-large font-inter font-bold text-text-primary dark:text-white mb-2">How do I contact support?</Text>
        <Text className="text-body-medium font-inter text-text-secondary dark:text-gray-400">
          For any issues or feedback, please email us at support@example.com.
        </Text>
      </View>
    </ScrollView>
  );
}
