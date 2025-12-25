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

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { logout, userData } = useAuth();

  // Helper cek menu aktif
  const isActive = (path: string) => {
    // Logic ini memastikan highlight menu tetap benar
    if (path === "") return pathname === "/dashboard/admin";
    return pathname.startsWith(`/dashboard/admin/${path}`);
  };

  const navigateTo = (path: string) => {
    // Gunakan router.navigate agar tidak menumpuk history stack berlebihan
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
      {/* Header Drawer */}
      <View
        style={[styles.drawerHeader, { backgroundColor: theme.colors.primary }]}
      >
        <Avatar.Icon
          size={64}
          icon="account-circle"
          style={{ backgroundColor: "white" }}
          color={theme.colors.primary}
        />
        <Text variant="titleMedium" style={styles.drawerTitle}>
          {userData?.username || "Admin"}
        </Text>
        <Text variant="bodySmall" style={styles.drawerSubtitle}>
          {userData?.email || "admin@example.com"}
        </Text>
      </View>

      <PaperDrawer.Section showDivider={false} style={{ flex: 1 }}>
        {/* 1. DASHBOARD */}
        {/* Pastikan diawali '/' dan mengarah ke admin */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={isActive("") ? theme.colors.primary : "#666"}
            />
          )}
          label="Dashboard"
          active={isActive("")}
          onPress={() => navigateTo("/dashboard/admin")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        {/* 2. PROFIL SAYA */}
        {/* Pastikan diawali '/' */}
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
          onPress={() => navigateTo("/dashboard/admin/profile")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        <Divider style={{ marginVertical: 8 }} />

        {/* 3. KELOLA KAMAR */}
        {/* Pastikan diawali '/' */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="bed"
              size={size}
              color={isActive("kamar") ? theme.colors.primary : "#666"}
            />
          )}
          label="Kelola Kamar"
          active={isActive("kamar")}
          onPress={() => navigateTo("/dashboard/admin/kamar")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        {/* 4. KELOLA FASILITAS */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="weekend"
              size={size}
              color={isActive("fasilitas") ? theme.colors.primary : "#666"}
            />
          )}
          label="Kelola Fasilitas"
          active={isActive("fasilitas")}
          onPress={() => navigateTo("/dashboard/admin/fasilitas")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />

        {/* 5. KELOLA PERABOTAN */}
        <PaperDrawer.Item
          icon={({ size, color }) => (
            <MaterialIcons
              name="kitchen"
              size={size}
              color={isActive("perabotan") ? theme.colors.primary : "#666"}
            />
          )}
          label="Kelola Perabotan"
          active={isActive("perabotan")}
          onPress={() => navigateTo("/dashboard/admin/perabotan")}
          theme={{ colors: { secondaryContainer: "#E6F2FF" } }}
        />
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
          label="Keluar / Logout"
          onPress={handleLogout}
          theme={{ colors: { onSurfaceVariant: theme.colors.error } }}
        />
      </View>

      <View style={styles.drawerFooter}>
        <Text variant="bodySmall" style={{ color: "#888" }}>
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default function AdminLayout() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#fff",
        headerShown: true,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Dashboard Admin" }} />
      <Drawer.Screen name="profile/index" options={{ title: "Profil Saya" }} />
      <Drawer.Screen name="kamar/index" options={{ title: "Kelola Kamar" }} />
      <Drawer.Screen
        name="fasilitas/index"
        options={{ title: "Kelola Fasilitas" }}
      />
      <Drawer.Screen
        name="perabotan/index"
        options={{ title: "Kelola Perabotan" }}
      />
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
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
});
