import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

const NavigateLocation = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
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
    };

    getLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} className="mt-14">
        <TouchableOpacity>
          {/* Add buttons or other UI elements here */}
        </TouchableOpacity>
        <MapView
          style={styles.map}
          mapType="hybrid"
          region={region}
        >
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title={"You are here"}
            description={"Current location"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default NavigateLocation;
