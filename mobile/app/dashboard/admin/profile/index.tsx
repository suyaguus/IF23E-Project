import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Text,
  List,
  Divider,
  useTheme,
  Button,
  Card,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { Route, useRouter } from "expo-router";

export default function UserProfile() {
  const { userData, logout } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "US";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header Profile */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.avatarContainer}>
          {userData?.imageUrl ? (
            <Avatar.Image
              size={100}
              source={{ uri: userData.imageUrl }}
              style={{ backgroundColor: "white" }}
            />
          ) : (
            <Avatar.Text
              size={100}
              label={getInitials(userData?.username || "User")}
              style={{ backgroundColor: "white" }}
              color={theme.colors.primary}
            />
          )}
        </View>
        <Text variant="headlineSmall" style={styles.name}>
          {userData?.username || "Nama Pengguna"}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {userData?.email || "email@example.com"}
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

            <List.Item
              title="Username"
              description={userData?.username}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="account"
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />
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
          </Card.Content>
        </Card>

        {/* Tombol Aksi */}
        <Button
          mode="contained"
          style={{ marginTop: 20, borderRadius: 8 }}
          onPress={() => router.push("/dashboard/admin/profile/edit" as Route)}
        >
          Edit Profil & Password
        </Button>

        <Button
          mode="outlined"
          style={{ marginTop: 15 }}
          onPress={() => router.push("/dashboard/admin")}
        >
          Kembali
        </Button>

        <Button
          mode="outlined"
          textColor={theme.colors.error}
          style={{
            marginTop: 15,
            borderColor: theme.colors.error,
            borderRadius: 8,
          }}
          onPress={logout}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: { marginBottom: 15, elevation: 5, borderRadius: 50 },
  name: { color: "white", fontWeight: "bold", marginTop: 5 },
  email: { color: "#E6F2FF", marginTop: 5 },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: "white", elevation: 2, borderRadius: 12 },
});
