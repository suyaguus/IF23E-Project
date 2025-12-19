import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Card,
  Text,
  List,
  Divider,
  useTheme,
  Button,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function AdminProfilePage() {
  const { userData, logout } = useAuth();
  const theme = useTheme();

  // Ambil inisial nama untuk Avatar (Misal: Surya Agung -> SA)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header Profile */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={100}
            label={getInitials(userData?.username || "Admin")}
            style={{ backgroundColor: "white" }}
            color={theme.colors.primary}
            labelStyle={{ fontWeight: "bold", fontSize: 32 }}
          />
        </View>
        <Text variant="headlineSmall" style={styles.name}>
          {userData?.username || "Nama Pengguna"}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          {userData?.role || "Admin"}
        </Text>
      </View>

      {/* Detail Informasi */}
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text
              variant="titleMedium"
              style={{ marginBottom: 15, fontWeight: "bold" }}
            >
              Informasi Pribadi
            </Text>

            {/* Email */}
            <List.Item
              title="Email"
              description={userData?.email}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="email"
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />

            {/* No Telepon */}
            <List.Item
              title="Nomor Telepon"
              description={userData?.notelp || "Belum diatur"}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="phone"
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />

            {/* Tanggal Bergabung (Opsional, jika ada createdAt) */}
            <List.Item
              title="Bergabung Sejak"
              // Format tanggal sederhana
              description={userData ? new Date().toLocaleDateString() : "-"}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="calendar"
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Tombol Aksi Tambahan */}
        <Button
          mode="outlined"
          icon="account-edit"
          style={{ marginTop: 20, borderColor: theme.colors.primary }}
          onPress={() => alert("Fitur Edit Profil akan datang segera!")}
        >
          Edit Profil
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
    elevation: 5,
    borderRadius: 50,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
  role: {
    color: "#E6F2FF",
    marginTop: 5,
    textTransform: "capitalize",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 12,
  },
});
