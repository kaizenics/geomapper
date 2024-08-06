import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LocationForm from "@/components/Forms/LocationForm";
import { captureRef } from "react-native-view-shot";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "expo-router";

const NavigateLocation = () => {
  const [describeLocation, setDescribeLocation] = useState<string>("");
  const [region, setRegion] = useState({
    latitude: 7.1907,
    longitude: 125.4553,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 7.1907,
    longitude: 125.4553,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [centerLocation, setCenterLocation] = useState({
    latitude: 7.1907,
    longitude: 125.4553,
  });
  const pulseAnimation = useState(new Animated.Value(1))[0];
  const opacityPulseAnimation = useState(new Animated.Value(1))[0];
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocation({ latitude, longitude });
      setCenterLocation({ latitude, longitude });
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (!isPanning) {
      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseAnimation, {
              toValue: 2,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(opacityPulseAnimation, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(opacityPulseAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }, 300);

      setTimeoutId(newTimeoutId);
    } else {
      pulseAnimation.stopAnimation();
      pulseAnimation.setValue(1);
      opacityPulseAnimation.stopAnimation();
      opacityPulseAnimation.setValue(1);
    }
  }, [isPanning, pulseAnimation, opacityPulseAnimation]);

  const handleRegionChange = () => {
    setIsPanning(true);
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    setIsPanning(false);
    if (
      Math.abs(newRegion.latitude - region.latitude) > 0.0001 ||
      Math.abs(newRegion.longitude - region.longitude) > 0.0001 ||
      Math.abs(newRegion.latitudeDelta - region.latitudeDelta) > 0.0001 ||
      Math.abs(newRegion.longitudeDelta - region.longitudeDelta) > 0.0001
    ) {
      setRegion(newRegion);
      setCenterLocation({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
    setCurrentLocation({ latitude, longitude });
  };

  const saveLocation = async () => {
    if (!describeLocation.trim()) {
      Alert.alert("Error", "Please enter a description for the fishing spot.");
      return;
    }

    setLoading(true); // Start loading

    try {
      console.log("Describe Location:", describeLocation);
      // Capture screenshot of the map
      if (mapRef.current) {
        const screenshotUri = await captureRef(mapRef.current, {
          format: "png",
          quality: 1.0,
        });

        // Upload screenshot to Firebase Storage
        const auth = getAuth();
        const user = auth.currentUser;
        const storage = getStorage();

        if (user) {
          // Upload the screenshot
          const response = await fetch(screenshotUri);
          const blob = await response.blob();
          const storageRef = ref(storage, `map_screenshots/${user.uid}/${Date.now()}.png`);
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);

          // Prepare location data
          const locationData = {
            latitude: region.latitude,
            longitude: region.longitude,
            description: describeLocation,
            screenshotURL: downloadURL,
            timestamp: new Date(),
          };

          // Save location data to Firestore
          const firestore = getFirestore();
          await setDoc(doc(firestore, "log_catch", user.uid + "_" + Date.now()), locationData);

          router.push("/catches");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save location and upload screenshot.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="mt-14">
        <View className="flex flex-row text-lg  justify-center font-semibold text-black space-x-28">
          <Text className="text-lg font-psemibold text-black">
            Lat:{" "}
            <Text className="font-pregular">{region.latitude.toFixed(6)}</Text>
          </Text>
          <Text className="text-lg font-psemibold text-black">
            Lon:{" "}
            <Text className="font-pregular">{region.longitude.toFixed(6)}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.container} className="mt-2">
        <MapView
          style={styles.map}
          mapType="hybrid"
          region={region}
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={handleRegionChangeComplete}
          onPress={handleMapPress}
          ref={mapRef}
        >
          <Marker
            coordinate={currentLocation}
            title="Current Location"
            description="This is where you are"
          />
          <Marker
            coordinate={centerLocation}
            title="Center Location"
            description="Center of the map"
            pinColor="blue" 
          />
        </MapView>
        <View style={styles.markerFixed}>
          <Animated.View
            style={[
              styles.pulse,
              {
                transform: [{ scale: pulseAnimation }],
                opacity: opacityPulseAnimation,
                pointerEvents: "none",
              },
            ]}
          />
          <View style={styles.marker} />
        </View>
      </View>
      <View className="mt-2">
        <TouchableOpacity className="mx-2 space-y-2">
          <LocationForm
            label="Fishing Spot Location"
            value={describeLocation}
            placeholder="Enter the location of the fishing spot"
            onChangeText={setDescribeLocation}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#1e5aa0" /> // Show spinner when loading
          ) : (
            <TouchableOpacity
              className="bg-[#1e5aa0] rounded-full py-3 items-center mb-2"
              onPress={saveLocation}
            >
              <View className="flex-row items-center space-x-3">
                <Text className="text-white text-lg font-semibold">
                  Save Location
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -3,
    marginTop: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 5,
    width: 5,
    borderRadius: 7,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
  },
  pulse: {
    position: "absolute",
    height: 124,
    width: 124,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
});

export default NavigateLocation;
