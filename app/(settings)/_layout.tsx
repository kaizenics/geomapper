import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="user-settings"
        options={{
          title: "Settings",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
        }}
      />
       <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit profile",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
}
