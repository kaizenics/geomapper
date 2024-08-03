import React from "react";
import { Stack } from "expo-router";

export default function LogsLayout() {
  return (
    <Stack>
        <Stack.Screen
        name="navigate-location"
        options={{
          title: "Navigate Location",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="catches"
        options={{
          title: "Catches",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
}
