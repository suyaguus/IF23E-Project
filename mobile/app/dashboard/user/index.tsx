import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Text,
  Card,
  Button,
  useTheme,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { kamarService } from "@/services/kamarService";
import { Kamar } from "@/types/interfaces";
import { Route, useRouter } from "expo-router";

const QuickActionButton = ({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) => (
  <TouchableOpacity style={styles.actionItem}>
    <View style={[styles.iconCircle, { backgroundColor: color + "15" }]}>
      <MaterialCommunityIcons name={icon as any} size={28} color={color} />
    </View>
    <Text variant="labelMedium" style={styles.actionLabel}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function UserDashboard() {
  const { userData } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const router = useRouter();
  const [rooms, setRooms] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAvailableRooms = async () => {
    try {
      const data = await kamarService.getAll();
      const available = data.filter((k: Kamar) => k.statusKamar === "Tersedia");
      setRooms(available.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  Status Kos Saya
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ marginTop: 5, color: "#777" }}
                >
                  Belum ada kos yang disewa.
                </Text>
              </View>
              <Avatar.Icon
                size={48}
                icon="home-outline"
                style={{ backgroundColor: "#e0e7ff" }}
                color="#4f46e5"
              />
            </View>
          </Card.Content>
        </Card>

        {/* SECTION: DAFTAR KAMAR TERSEDIA (Horizontal) */}
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Kamar Tersedia
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/dashboard/user/rooms" as Route)}
          >
            <Text style={{ color: theme.colors.primary }}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator animating={true} style={{ marginBottom: 20 }} />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {rooms.map((item) => (
              <Card
                key={item.id}
                style={styles.roomCard}
                onPress={() => router.push(`/dashboard/user/rooms/${item.id}` as Route)}
              >
                <Card.Cover
                  source={{ uri: "https://picsum.photos/700" }}
                  style={styles.cardImage}
                />
                <Card.Content style={{ padding: 10 }}>
                  <Text variant="titleSmall" numberOfLines={1}>
                    {item.nomorKamar}
                  </Text>
                  <Text
                    variant="labelLarge"
                    style={{ color: theme.colors.primary, fontWeight: "bold" }}
                  >
                    Rp {item.hargaSewa.toLocaleString("id-ID")}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        )}

        {/* SECTION: LAYANAN */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Layanan Kami
        </Text>
        <View style={styles.quickActionGrid}>
          <QuickActionButton icon="wallet" label="Bayar" color="#4CAF50" />
          <QuickActionButton icon="tools" label="Lapor" color="#FF9800" />
          <QuickActionButton
            icon="phone-outline"
            label="Bantuan"
            color="#E91E63"
          />
        </View>

        {/* SECTION: AKTIVITAS TERAKHIR (Empty State) */}
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { marginTop: 10 }]}
        >
          Aktivitas Terakhir
        </Text>
        <Card style={styles.emptyActivityCard}>
          <Card.Content style={{ alignItems: "center", paddingVertical: 30 }}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={40}
              color="#bbb"
            />
            <Text variant="bodyMedium" style={{ color: "#999", marginTop: 10 }}>
              Belum ada aktivitas saat ini.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  welcome: { fontWeight: "bold", marginBottom: 5, color: "#333" },
  card: { marginBottom: 20, backgroundColor: "white", borderRadius: 12 },
  sectionTitle: { fontWeight: "bold", marginBottom: 15, color: "#444" },
  quickActionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionItem: { alignItems: "center", width: "22%" },
  iconCircle: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: { fontWeight: "600", color: "#555" },
  emptyActivityCard: {
    marginBottom: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 0,
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  roomCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
  },
  cardImage: { height: 100 },
});
