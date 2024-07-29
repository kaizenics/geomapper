import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signUpWithEmailAndPassword, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUpWithEmailAndPassword(email, password);
      Alert.alert("Success", "User account created & signed in!");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
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
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="font-bold text-white text-md">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailSignup;
