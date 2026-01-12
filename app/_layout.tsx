import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { PostProvider } from "@/contexts/PostContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect } from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
      <PostProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <GestureHandlerRootView> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="light" />
        </GestureHandlerRootView>
      </PostProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
