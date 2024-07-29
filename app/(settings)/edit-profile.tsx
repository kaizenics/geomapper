import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Settings() {
  
  return (
    <ScrollView className="flex-1 p-5 pt-20 bg-white">
      <View className="mb-5">
        <Text className="text-lg font-psemibold mb-3">Profile Settings</Text>
        </View>
    </ScrollView>
  );
}
