import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const isValidEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    // Simple password validation (minimum length, could add more checks)
    return password.length >= 6;
  };

  const handleLogin = async () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setLoading(true);

    try {
      await loginWithEmailAndPassword(email, password);
      router.push("/home");
    } catch (error: any) {
      console.error("Error logging in: ", error.message);
      setEmailError("Invalid email or password.");
      setPasswordError(""); // Clear password error on login failure
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#0e4483] relative">
      <FormField
        label="Email Address"
        value={email}
        placeholder="Enter your email address"
        onChangeText={setEmail}
      />
    
        {emailError ? (
          <Text className="text-red-500 text-left">{emailError}</Text>
        ) : null}
        


      <FormField
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
      />
      {passwordError ? (
        <Text className="text-red-500 text-left mb-2">{passwordError}</Text>
      ) : null}

      <CustomButton title="Log In" onPress={handleLogin} disabled={loading} />

      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-white text-center text-md">
          Did you forget your password?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/reset-password")}>
          <Text className="font-bold text-white text-md">Reset Password</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View className="absolute inset-0 top-0 right-0 bottom-0 left-0 bg-black/50 flex justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white text-center mt-2">Logging in...</Text>
        </View>
      )}
    </View>
  );
};

export default EmailLogin;
