import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="log-in"
        options={{
          title: "Log in", 
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: "#FFF" },
          headerTintColor: "#FFF",
         }}
      />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
