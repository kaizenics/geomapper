import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { LineChart } from "react-native-chart-kit";
import icons from "../../constants/icons";

const Home = () => {
  const [dailyWaveHeights, setDailyWaveHeights] = useState<number[]>([]);
  const [dailyLabels, setDailyLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchDailyWaveHeights = async () => {
      try {
        const response = await fetch(
          "https://marine-api.open-meteo.com/v1/marine?latitude=7.0731&longitude=125.6128&daily=wave_height_max"
        );
        const data = await response.json();
        const heights = data.daily.wave_height_max;
        const times = data.daily.time;


        setDailyWaveHeights(heights);
        setDailyLabels(times.map((time: string) => time.split("-").slice(1).join("-"))); // Extracting date from ISO string
      } catch (error) {
        console.error("Error fetching daily wave heights:", error);
      }
    };

    fetchDailyWaveHeights();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4">
          <Text className="text-black text-3xl font-psemibold pt-4">
            Hello Nicose John!
          </Text>
          <Text className="text-black text-xl font-pregular">
            It is a little cloudy today.
          </Text>

          <LinearGradient
            colors={['#4a90e2', '#0e4483']} 
            style={{ borderRadius: 10, padding: 16, marginTop: 24 }}
          >
            <View className="flex flex-row justify-between">
              <View className="flex-col justify-between">
                <Text className="text-white text-2xl mb-2 font-pmedium">
                  Cloudy
                </Text>
                <Text className="text-white text-6xl font-semibold">25°</Text>
                <Text className="text-white text-lg font-psemibold">
                  Friday
                </Text>
                <Text className="text-white text-md mb-2 font-pregular">
                  07.24.2024
                </Text>
              </View>
              <View className="flex-row justify-between space-x-4">
                {/* Day 1 */}
                <View className="items-center">
                  <Text className="text-white font-psemibold mb-5">Mon</Text>
                  <Image
                    source={icons.heavyRain}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-md font-pmedium mt-5">25°C</Text>
                  <Text className="text-white font-pregular">Sunny</Text>
                </View>
                {/* Day 2 */}
                <View className="items-center">
                  <Text className="text-white font-psemibold mb-5">Tue</Text>
                  <Image
                    source={icons.sunny}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-md font-pmedium mt-5">25°C</Text>
                  <Text className="text-white font-pregular">Sunny</Text>
                </View>
                {/* Day 3 */}
                <View className="items-center">
                  <Text className="text-white font-psemibold mb-5">Wed</Text>
                  <Image
                    source={icons.rainy}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-md font-pmedium mt-5">25°C</Text>
                  <Text className="text-white font-pregular">Sunny</Text>
                </View>

                <View className="items-center">
                  <Text className="text-white font-psemibold mb-5">Thu</Text>
                  <Image
                    source={icons.windy}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-md font-pmedium mt-5">25°C</Text>
                  <Text className="text-white font-pregular">Sunny</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

            {/* Line Chart */}
            <View className="mt-3">
              <Text className="text-lg text-black font-psemibold">Daily Wave Heights</Text>
            <LineChart
              data={{
                labels: dailyLabels.length > 0 ? dailyLabels : ["Fetching Data..."],
                datasets: [
                  {
                    data: dailyWaveHeights.length > 0 ? dailyWaveHeights : [0],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 32}
              height={200}
              yAxisLabel=""
              yAxisSuffix="m"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#167cfa",
                backgroundGradientFrom: "#167cfa",
                backgroundGradientTo: "#0e4483",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
