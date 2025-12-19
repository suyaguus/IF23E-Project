import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Drawer } from "expo-router/drawer";
import { useRouter, usePathname } from "expo-router";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import {
  Avatar,
  Text,
  Drawer as PaperDrawer,
  useTheme,
  Divider,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

const UserDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { logout, userData } = useAuth();

  const isActive = (path: string) => {
    if (path === "") return pathname === "/dashboard/user";
    return pathname.startsWith(`/dashboard/user/${path}`);
  };

  const navigateTo = (path: string) => {
    router.navigate(path as any);
  };

  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Keluar dari aplikasi?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya",
        onPress: () => {
          logout();
          setTimeout(() => {
            while (router.canGoBack()) router.back();
            router.replace("/");
          }, 100);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      {/* Header Profile User */}
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
          {userData?.username || "Pengguna"}
        </Text>
        <Text variant="bodySmall" style={styles.drawerSubtitle}>
          {userData?.email || "user@example.com"}
        </Text>
      </View>

      <PaperDrawer.Section showDivider={false} style={{ flex: 1 }}>
        {/* MENU DASHBOARD USER */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={isActive("") ? theme.colors.primary : "#666"}
            />
          )}
          label="Beranda"
          active={isActive("")}
          onPress={() => navigateTo("/dashboard/user")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        {/* MENU PROFILE USER */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="person"
              size={size}
              color={isActive("profile") ? theme.colors.primary : "#666"}
            />
          )}
          label="Profil Saya"
          active={isActive("profile")}
          onPress={() => navigateTo("/dashboard/user/profile")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        {/* NANTI BISA DITAMBAH: RIWAYAT, KOS SAYA, DLL */}
      </PaperDrawer.Section>

      <View style={{ paddingBottom: 10 }}>
        <Divider style={{ marginVertical: 10 }} />
        <PaperDrawer.Item
          icon={({ size }) => (
            <MaterialIcons
              name="logout"
              size={size}
              color={theme.colors.error}
            />
          )}
          label="Keluar"
          onPress={handleLogout}
          theme={{ colors: { onSurfaceVariant: theme.colors.error } }}
        />
      </View>
    </SafeAreaView>
  );
};

export default function UserLayout() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <UserDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#fff",
        headerShown: true,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Beranda User" }} />
      <Drawer.Screen name="profile/index" options={{ title: "Profil Saya" }} />
    </Drawer>
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
  drawerSubtitle: { color: "#E6F2FF", marginTop: 4 },
});
