import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useRouter, usePathname } from "expo-router";
import {
  PaperProvider,
  DefaultTheme,
  Drawer as PaperDrawer,
  Text,
  Avatar,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#003399",
    secondary: "#4DA6FF",
    background: "#FFFFFF",
    surface: "#F0F4F8",
    onPrimary: "#FFFFFF",
  },
};

// komponen drawer
const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const router = useRouter();
  const pathname = usePathname();

  const { userData, isLoggedIn } = useAuth();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <View
        style={[styles.drawerHeader, { backgroundColor: theme.colors.primary }]}
      >
        <Avatar.Icon
          size={64}
          icon="account"
          style={{ backgroundColor: "white" }}
          color={theme.colors.primary}
        />

        <Text variant="titleMedium" style={styles.drawerTitle}>
          {isLoggedIn && userData ? userData.username : "Guest User"}
        </Text>
        <Text variant="bodySmall" style={styles.drawerSubtitle}>
          {isLoggedIn && userData ? userData.email : "Belum Login"}
        </Text>
      </View>

      <PaperDrawer.Section showDivider={false} style={{ flex: 1 }}>
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="dashboard"
              size={size}
              color={isActive("dashboard") ? theme.colors.primary : "#666"}
            />
          )}
          label="Dashboard"
          active={isActive("dashboard")}
          onPress={() => router.push("../dashboard")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="login"
              size={size}
              color={isActive("auth/login") ? theme.colors.primary : "#666"}
            />
          )}
          label="Login"
          active={isActive("auth/login")}
          onPress={() => router.push("../auth/login")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />
      </PaperDrawer.Section>

      <View style={styles.drawerFooter}>
        <Text variant="bodySmall" style={{ color: "#888" }}>
          Versi Aplikasi 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

// komponen navigasi
function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: "#fff",
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: "#333",
          headerShown: false,
        }}
      >
        {/* Menu Guest */}
        <Drawer.Screen name="dashboard/page" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="auth/login/page" options={{ title: "Login" }} />

        {/* Menu Tersembunyi */}
        <Drawer.Screen
          name="dashboard/index" 
          options={{ title: "Dashboard" }}
        />

        <Drawer.Screen
          name="auth/login/index" 
          options={{ title: "Login" }}
        />
        <Drawer.Screen
          name="auth/forgot-password/index"
          options={{ drawerItemStyle: { display: "none" } }}
        />

        {/* Admin Layout Tersembunyi */}
        <Drawer.Screen
          name="index"
          options={{ drawerItemStyle: { display: "none" } }}
        />

      </Drawer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
    </GestureHandlerRootView>
  );
}

// komponen root
export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <RootLayoutNav />
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 40,
  },
  drawerTitle: { color: "#fff", fontWeight: "bold", marginTop: 10 },
  drawerSubtitle: { color: "#E6F2FF" },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
});
