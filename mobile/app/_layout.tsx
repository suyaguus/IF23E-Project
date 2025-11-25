import { Stack } from "expo-router";
import "react-native-reanimated";
import { DefaultTheme, PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { StatusBar } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF0000",
    secondary: "#FFCC00",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>

    //     {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}

    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          // menghilangkan header Index
          headerShown: false,
        }}
      ></Stack>

      {/* buat status bar */}
      <StatusBar barStyle={"light-content"} backgroundColor={"#a51c31"} />
    </PaperProvider>
  );
}
