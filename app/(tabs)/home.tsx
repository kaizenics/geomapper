import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, RefreshControl, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import HourlyWaveHeight from "@/components/HourlyWaveHeight";
import HourlyWaveDirection from "@/components/HourlyWaveDirection";
import HourlyWavePeriod from "@/components/HourlyWavePeriod";
import icons from "@/constants/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Home = () => {
  const [hourlyWaveHeights, setHourlyWaveHeights] = useState<number[]>([]);
  const [hourlyWaveDirections, setHourlyWaveDirections] = useState<number[]>([]);
  const [hourlyWavePeriods, setHourlyWavePeriods] = useState<number[]>([]);
  const [hourlyLabels, setHourlyLabels] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<number | null>(null);
  const [weatherCodes, setWeatherCodes] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyTemperatures, setDailyTemperatures] = useState<number[]>([]);
  const [dailyWindSpeeds, setDailyWindSpeeds] = useState<number[]>([]);
  const [dailyWindDirections, setDailyWindDirections] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [locationAddress, setLocationAddress] = useState<string>("Loading...");
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const auth = getAuth();
  const db = getFirestore();

  const getUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName || "User");
      }
    }
  };

  // Fetch user's location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert("Permission denied", "Location permission is required to fetch the weather data.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // Reverse Geocoding to get the address
    const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
    if (reverseGeocode.length > 0) {
      const address = `${reverseGeocode[0].city}, ${reverseGeocode[0].region}`;
      setLocationAddress(address);
    } else {
      setLocationAddress("Address not available");
    }

    return location;
  };

  // Fetch weather data using the user's location
  const getWeatherData = async () => {
    try {
      const location = await getLocation();
      if (!location) return;

      const { latitude, longitude } = location.coords;

      // Weather API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m&daily=weather_code,temperature_2m_max,wind_speed_10m_max,wind_direction_10m_dominant`
      );
      const weatherData = await weatherResponse.json();

      // Marine Forecast API
      const marineResponse = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,wave_direction,wave_period&daily=&timezone=Asia%2FSingapore`
      );
      const marineData = await marineResponse.json();

      const {
        temperature_2m,
        wind_speed_10m,
        wind_direction_10m,
        weather_code,
      } = weatherData.current;

      const heights = marineData.hourly.wave_height;
      const directions = marineData.hourly.wave_direction;
      const periods = marineData.hourly.wave_period;
      const times = marineData.hourly.time;
      const temperatures = weatherData.daily.temperature_2m_max;
      const dailyWeatherCodes = weatherData.daily.weather_code;
      const dailyWindSpeeds = weatherData.daily.wind_speed_10m_max || [];
      const dailyWindDirections =
        weatherData.daily.wind_direction_10m_dominant || [];

        
       setTemperature(temperature_2m);
      setWindSpeed(wind_speed_10m);
      setWindDirection(wind_direction_10m);
      setWeatherCodes(dailyWeatherCodes);
      setHourlyWaveHeights(heights);
      setHourlyWaveDirections(directions);
      setHourlyWavePeriods(periods);
      setHourlyLabels(getNextHours());
      setDailyTemperatures(temperatures);
      setDailyWindSpeeds(dailyWindSpeeds.slice(0, 4));
      setDailyWindDirections(dailyWindDirections.slice(0, 4));

      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
    getWeatherData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getWeatherData();
  };

  const weatherIcons: { [key: number]: any; default: any } = {
    0: icons.sunny,
    1: icons.partlyCloudy,
    2: icons.partlyCloudy,
    3: icons.partlyCloudy,
    45: icons.foggy,
    48: icons.foggy,
    51: icons.heavyRain,
    53: icons.heavyRain,
    55: icons.heavyRain,
    61: icons.rainy,
    63: icons.rainy,
    65: icons.rainy,
    80: icons.foggy,
    81: icons.foggy,
    82: icons.foggy,
    95: icons.windy,
    96: icons.windy,
    99: icons.windy,
    default: icons.cloud,
  };

  const getWeatherDescription = (code: number | null) => {
    if (code === null) return "Data Unavailable";
    switch (code) {
      case 0:
        return "Clear Sky";
      case 1:
      case 2:
      case 3:
        return "Partly Cloudy";
      case 45:
      case 48:
        return "Foggy";
      case 51:
      case 53:
      case 55:
        return "Drizzle";
      case 61:
      case 63:
      case 65:
        return "Rainy";
      case 80:
      case 81:
      case 82:
        return "Showers";
      case 95:
      case 96:
      case 99:
        return "Thunderstorm";
      default:
        return "Unknown Weather";
    }
  };

  const getWeatherIcon = (code: number | null) => {
    if (code === null) return weatherIcons.default;
    return weatherIcons[code] || weatherIcons.default;
  };

  const getCustomWeatherPhrase = (description: string) => {
    if (description.includes("Rainy") || description.includes("Showers")) {
      return "Grab an umbrella before heading out!";
    } else if (description.includes("Clear Sky")) {
      return "It's a great day for outdoor activities!";
    } else if (description.includes("Partly Cloudy")) {
      return "It might be a bit cloudy, but still a nice day.";
    } else {
      return "Check the weather before heading out!";
    }
  };

  const getNextDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    return Array.from({ length: 5 }, (_, i) => daysOfWeek[(today + i) % 7]);
  };

  const nextDays = getNextDays();

  const getNextHours = () => {
  const currentHour = new Date();


  const options: Intl.DateTimeFormatOptions = { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false, 
    timeZone: 'Asia/Singapore' 
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);

  const hours = Array.from({ length: 6 }, (_, i) => {
    const hour = new Date(currentHour.setMinutes(0, 0, 0)); 
    hour.setHours(hour.getHours() - (5 - i)); 
    return formatter.format(hour);
  });

  return hours;
};

  const nextHours = getNextHours();

  const calculateRotation = (direction: number) => {
    // Rotation angle calculation based on wind direction
    // 0° is North, 90° is East, 180° is South, 270° is West
    return direction - 180;
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="">
          <Text className="text-black text-2xl font-psemibold pt-4">
            Hello {firstName ? firstName : "User"}!
          </Text>
          <Text className="text-black text-lg ">
            {loading
              ? "Loading..."
              : getCustomWeatherPhrase(getWeatherDescription(weatherCodes[0]))}
          </Text>
            
            <View className=" flex-row items-center pt-2">
              <View className="flex flex-row rounded-full border border-[#0e4483] px-2 py-2">
              <Image
              source={icons.location}
              className="w-4 h-4 mr-1.5"
              resizeMode="contain"
              style={{ tintColor: "#0e4483" }}
              />
              <Text className="text-[#0e4483] text-sm font-regular">{locationAddress}</Text>
              </View>
            </View>

          {/* Weather Forecast */}
          <LinearGradient
            colors={["#4a90e2", "#0e4483"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            style={{ borderRadius: 10, padding: 16, marginTop: 24 }}
          >
            <View className="flex flex-row justify-between">
              <View className="flex-col justify-between">
                <Text className="text-white text-lg mb-2 font-medium">
                  {loading
                    ? "Loading..."
                    : getWeatherDescription(weatherCodes[0])}
                </Text>
                <Text className="text-white text-5xl font-semibold">
                  {loading
                    ? "Loading..."
                    : temperature !== null
                    ? `${temperature}°`
                    : "Data Unavailable"}
                </Text>
                <Text className="text-white text-lg font-semibold">
                  {nextDays[0]}
                </Text>
                <Text className="text-white text-md mb-2 font-regular">
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between mt-2 space-x-3">
                {nextDays.slice(1).map((day, index) => (
                  <View key={index} className="items-center">
                    <Text className="text-white font-semibold mb-5">{day}</Text>
                    <Image
                      source={
                        loading
                          ? icons.cloud
                          : getWeatherIcon(weatherCodes[index + 1])
                      }
                      className="w-7 h-7"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-md font-medium mt-5">
                      {loading ? "Loading..." : `${dailyTemperatures[index]}°C`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>

          {/* Wind Speed */}
          <LinearGradient
            colors={["#4a90e2", "#0e4483"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            style={{
              borderRadius: 10,
              paddingTop: 16,
              paddingBottom: 13,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 6,
            }}
          >
            <View className="flex justify-between">
              <View className="flex-row items-center justify-between">
                <View className="ml-2 mr-3">
                  <Image
                    source={icons.wind}
                    className="w-12 h-12"
                    resizeMode="contain"
                    style={{ tintColor: "white" }}
                  />
                </View>
                <View className="flex-row mx-2">
                {nextDays.slice(1, 5).map((day, index) => (
                  <View key={index} className="flex-col items-center mx-4">
                    <Image
                      source={icons.pointer}
                      className="w-6 h-6"
                      resizeMode="contain"
                      style={{
                        tintColor: "white",
                        transform: [
                          {
                            rotate: `${calculateRotation(
                              dailyWindDirections[index]
                            )}deg`,
                          },
                        ],
                      }}
                    />
                    <Text className="text-white text-md mt-2 font-medium">
                      {loading ? "Loading..." : dailyWindSpeeds[index] || "N/A"}
                    </Text>
                    <Text className="text-white text-md mb-2 font-medium">
                      {loading
                        ? "Loading..."
                        : dailyWindDirections[index] || "N/A"}
                      °
                    </Text>
                  </View>
                ))}
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Wave Height Chart */}
          <View className="mt-6">
            <Text className="font-pbold text-black text-lg font-semibold">
              Wave Heights
            </Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <HourlyWaveHeight
                hourlyWaveHeights={hourlyWaveHeights.slice(0, 6)}
                hourlyLabels={nextHours}
              />
            )}
          </View>

          {/* Wave Directions Chart */}
          <View>
            <Text className="font-pbold text-black text-lg font-semibold">
              Wave Directions
            </Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <HourlyWaveDirection
                hourlyWaveDirections={hourlyWaveDirections.slice(0, 6)}
                hourlyLabels={nextHours}
              />
            )}
          </View>

          {/* Wave Periods Chart */}
          <View>
            <Text className="font-pbold text-black text-lg font-semibold">
              Wave Periods
            </Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <HourlyWavePeriod
                hourlyWavePeriods={hourlyWavePeriods.slice(0, 6)}
                hourlyLabels={nextHours}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
