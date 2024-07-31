import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import FormField from "../../components/Forms/FormField";
import CustomButton from "../../components/Buttons/CustomButton";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
      Alert.alert("Success", "User logged in successfully!");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 pt-16 items-center bg-[#0e4483]">
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
      
       
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <CustomButton title="Log In" onPress={handleLogin} disabled={loading} />
        )}

<CustomButton title="Log In" onPress={() => router.push("/home")} />

      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-white text-center text-md">
          Did you forget your password?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/reset-password")}>
          <Text className="font-bold text-white text-md">Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailLogin;
