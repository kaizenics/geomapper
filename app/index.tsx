import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton'; 
import GoogleButton from '../components/GoogleButton';
import images from '../constants/images';

export default function Index() {
  return (
    <SafeAreaView className="bg-[#167cfa] h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center h-full items-center px-2">
          <Image
            source={images.logo}
            className="w-[230px] h-[150px]"
            resizeMode="contain"
          />
          <Text className="text-white text-center text-lg font-regular mt-4 mx-10 leading-5">
            Find fishing spots and local info trusted by millions of anglers.
          </Text>
          <View className="mt-10 space-y-4">
            <GoogleButton title="Continue with Google" onPress={() => { console.log('Button Pressed'); }} />
            <CustomButton title="Continue with Email" onPress={() => { console.log('Button Pressed'); }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
