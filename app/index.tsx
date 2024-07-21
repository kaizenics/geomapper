import { Text, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <LinearGradient colors={['#38bdf8', '#06b6d4', '#075985']}
    style={{ flex: 1 }}>
      <SafeAreaView className="bg-gradient-to-r from-slate-600 to-cyan-500 h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            <Text className="text-white text-2xl font-bold">
              Welcome to My App
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
