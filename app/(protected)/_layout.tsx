import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="posts/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trips/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trips/createTripScreen"
        options={{ headerShown: false}}
      />
    </Stack>
  );
}
