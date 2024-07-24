import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";
import images from "../../constants/images";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", password);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#167cfa] ">
     
      <FormField
        label="First Name"
        value={email}
        placeholder="Enter your first name"
        onChangeText={setFirstName}
      />
      <FormField
        label="Last Name"
        value={email}
        placeholder="Enter your last name"
        onChangeText={setLastName}
      />
      <FormField
        label="Email"
        value={password}
        placeholder="Enter your email address"
        secureTextEntry
        onChangeText={setEmail}
      />
      <FormField
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <CustomButton title="Sign up" onPress={handleSignup} />

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

export default EmailSignup;
