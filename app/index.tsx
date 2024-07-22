import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import GoogleButton from "../components/GoogleButton";
import images from "../constants/images";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-[#167cfa] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center h-full items-center px-2">
          <Image
            source={images.logo}
            className="w-[230px] h-[150px]"
            resizeMode="contain"
          />
          <Text className="text-white text-center text-lg font-regular mt-4 mx-10 leading-5">
            Find fishing spots and track marine fishes powered by SST and
            Sonar.
          </Text>
          <View className="mt-10 space-y-4">
            <GoogleButton
              title="Continue with Google"
              onPress={() => {
                console.log("Button Pressed");
              }}
            />
            <CustomButton
              title="Continue with Email"
              onPress={() => {
                console.log("Button Pressed");
              }}
            />
          </View>
          <View className="flex-row items-center justify-center mt-10">
            <Text className="text-white text-center text-lg font-regular mt-5 mr-1 leading-5">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/log-in")}>
              <Text className="text-white text-center text-lg font-bold mt-5 leading-5">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-white text-center text-md font-regular mt-20 mx-10 leading-5">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
