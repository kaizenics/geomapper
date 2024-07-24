import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";
import images from "../../constants/images";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    router.push("/home");
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#167cfa] ">
      
      <FormField
        label="Email Address"
        value={email}
        placeholder="Enter your email address"
        onChangeText={setEmail}
      />
      <FormField
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <CustomButton title="Log In" onPress={handleLogin} />

      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-white text-center text-md">
          Did you forget your password?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/reset-password")}>
          <Text className="font-bold text-white text-md">
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailLogin;
