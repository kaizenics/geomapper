import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import FormField from "@/components/Forms/FormField";
import CustomButton from "@/components/Buttons/CustomButton";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true); 
    try {
      await signUpWithEmailAndPassword(email, password);
      Alert.alert("Success", "User account created & signed in! Please provide additional information.");
      router.push("/user-credentials");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#0e4483]">
      <FormField
        label="Email"
        value={email}
        placeholder="Enter your email address"
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? (
        <View className="items-start">
          <Text className="text-red-500 text-sm -mt-2">{emailError}</Text>
        </View>
      ) : null}
      <FormField
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <FormField
        label="Confirm Password"
        value={confirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <CustomButton title="Sign up" onPress={handleSignup} />
      )}

      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-white text-center text-md">
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/log-in")}>
          <Text className="font-bold text-white text-md">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailSignup;
