import React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";

import { useRouter } from "expo-router";

export default function LogIn() {
    const router = useRouter();

  return (
    <View className="flex-1 p-6 pt-24 bg-[#167cfa]">
      <Text className="text-4xl justify-start text-white font-bold mb-5">
        Welcome Back!
      </Text>

      <View className="mt-5">
        <GoogleButton
          title="Log in with Google"
          onPress={() => {
            console.log("Log In Pressed");
          }}
        />
        <CustomButton
          title="Log in with Email"
          onPress={() => {
            console.log("Log In Pressed");
          }}
        />
      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-white text-center mt-10 mr-1 text-lg">
          Not yet member?
        </Text>
        <TouchableOpacity onPress={() => router.push("/")}>
            <Text className="text-white text-center mt-10 text-lg font-bold">Create account</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}
