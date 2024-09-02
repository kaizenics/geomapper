import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const SSTMap = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SST Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.0732, 
          longitude: 125.6104,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="hybrid" 
      >
        <Marker
          coordinate={{
            latitude: 7.0732, 
            longitude: 125.6104,
          }}
          title="Davao Region"
          description="Sea Surface Temperature Data Point"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
});

export default SSTMap;
