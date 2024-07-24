import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#0e4483]">
      <FormField
        label="First Name"
        value={firstName}
        placeholder="Enter your first name"
        onChangeText={setFirstName}
      />
      <FormField
        label="Last Name"
        value={lastName}
        placeholder="Enter your last name"
        onChangeText={setLastName}
      />
      <FormField
        label="Email"
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
