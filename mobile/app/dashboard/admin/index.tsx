import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Avatar, useTheme } from "react-native-paper";

export default function AdminDashboardHome() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={60}
              icon="home"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <Text
              variant="headlineSmall"
              style={[styles.title, { color: theme.colors.primary }]}
            >
              Dashboard
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Selamat datang di sistem manajemen kos
            </Text>
          </Card.Content>
        </Card>

        {/* Contoh Statistik Singkat */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
            <Card.Content>
              <Text variant="labelLarge">Total Kamar</Text>
              <Text
                variant="displaySmall"
                style={{ color: theme.colors.primary }}
              >
                12
              </Text>
            </Card.Content>
          </Card>
          <Card style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
            <Card.Content>
              <Text variant="labelLarge">Terisi</Text>
              <Text variant="displaySmall" style={{ color: "green" }}>
                8
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  cardContainer: { alignItems: "center" },
  card: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  cardContent: { alignItems: "center" },
  title: { fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  subtitle: { color: "#666", textAlign: "center" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statCard: { backgroundColor: "#fff" },
});
