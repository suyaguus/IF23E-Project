import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, useTheme, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native"; // Tambah ini
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Tambah ini untuk ikon
import { useAuth } from "@/context/AuthContext";

const QuickActionButton = ({ icon, label, color }: { icon: string, label: string, color: string }) => (
  <TouchableOpacity style={styles.actionItem}>
    <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
      <MaterialCommunityIcons name={icon as any} size={28} color={color} />
    </View>
    <Text variant="labelMedium" style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);
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

        <Card style={styles.card}>
          <Card.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  Status Kos Saya
                </Text>
                <Text variant="bodyMedium" style={{ marginTop: 5, color: "#777" }}>
                  Belum ada kos yang disewa.
                </Text>
              </View>
              {/* Ikon rumah ditambahkan di sini agar kartu tidak kosong */}
              <Avatar.Icon size={48} icon="home-outline" style={{ backgroundColor: '#e0e7ff' }} color="#4f46e5" />
              </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="text">Cari Kos</Button>
          </Card.Actions>
        </Card>
        {/* SECTION: LAYANAN KAMI (Quick Actions) */}
        <Text variant="titleMedium" style={styles.sectionTitle}>Layanan Kami</Text>
        <View style={styles.quickActionGrid}>
          <QuickActionButton icon="wallet" label="Bayar" color="#4CAF50" />
          <QuickActionButton icon="tools" label="Lapor" color="#FF9800" />
          <QuickActionButton icon="book-open-variant" label="Aturan" color="#2196F3" />
          <QuickActionButton icon="phone-outline" label="Bantuan" color="#E91E63" />
        </View>
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
