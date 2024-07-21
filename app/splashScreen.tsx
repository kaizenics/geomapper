import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { NavigationProp } from '@react-navigation/native';

interface SplashScreenProps {
  navigation: NavigationProp<any>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // Replace 'Home' with your desired screen name
    }, 3000); // Splash screen duration (in milliseconds)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">Welcome to My App</Text>
    </View>
  );
};

export default SplashScreen;
