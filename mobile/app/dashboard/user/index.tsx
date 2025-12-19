import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

export default function UserDashboard() {
  const { userData } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.welcome}>
          Halo, {userData?.username || "Pengguna"}!
        </Text>
        <Text variant="bodyMedium" style={{ marginBottom: 20, color: "#666" }}>
          Mau cari kos apa hari ini?
        </Text>

        {/* Contoh Card Info Singkat */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              Status Kos Saya
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 5 }}>
              Belum ada kos yang disewa.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text">Cari Kos</Button>
          </Card.Actions>
        </Card>

        {/* Bisa ditambahkan List Kos Rekomendasi di sini nanti */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  welcome: { fontWeight: "bold", marginBottom: 5, color: "#333" },
  card: { marginBottom: 15, backgroundColor: "white" },
});
