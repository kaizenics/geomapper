import React from "react";
import { SafeAreaView, View, ScrollView, Text } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4">
          <Text className="text-black text-3xl font-semibold pt-4">
            Hello Nicose John!
          </Text>
          <Text className="text-black text-xl font-regular">
            It is a little cloudy today.
          </Text>

          <View className="mt-6 p-4 bg-blue-300 rounded-lg shadow-lg">
            <View className="flex flex-row justify-between">
              <View className=" flex-col justify-between">
                <Text className="text-white mb-2 text-2xl font-medium">Cloudy</Text>
                <Text className="text-white text-6xl  font-semibold">25°</Text>
                <Text className="text-white text-lg font-semibold">Friday</Text>
                <Text className="text-white text-md mb-2 font-regular">07.24.2024</Text>
              </View>
              <View className="flex-row justify-between space-x-4">
                {/* Day 1 */}
                <View className="items-center">
                  <Text className="text-black font-medium">Mon</Text>
                  <Text className="text-black text-lg">25°C</Text>
                  <Text className="text-gray-600">Sunny</Text>
                </View>
                {/* Day 2 */}
                <View className="items-center">
                  <Text className="text-black font-medium">Tue</Text>
                  <Text className="text-black text-lg">24°C</Text>
                  <Text className="text-gray-600">Partly Cloudy</Text>
                </View>
                {/* Day 3 */}
                <View className=" items-center">
                  <Text className="text-black font-medium">Wed</Text>
                  <Text className="text-black text-lg">22°C</Text>
                  <Text className="text-gray-600">Rainy</Text>
                </View>

                <View className=" items-center">
                  <Text className="text-black font-medium">Wed</Text>
                  <Text className="text-black text-lg">22°C</Text>
                  <Text className="text-gray-600">Rainy</Text>
                </View>

                <View className=" items-center">
                  <Text className="text-black font-medium">Wed</Text>
                  <Text className="text-black text-lg">22°C</Text>
                  <Text className="text-gray-600">Rainy</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
