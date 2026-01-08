import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  Alert,
} from "react-native";
import {
  Text,
  Button,
  useTheme,
  Chip,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { kamarService } from "@/services/kamarService";
import { Kamar } from "@/types/interfaces";

const { width } = Dimensions.get("window");

export default function RoomDetail() {
  const theme = useTheme();
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const roomId = Number(index);

  const [room, setRoom] = useState<Kamar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await kamarService.getById(roomId);
        setRoom(data);
      } catch (error) {
        console.error(error);
        if (Platform.OS === "web") alert("Gagal memuat detail kamar");
        else Alert.alert("Error", "Gagal memuat detail kamar");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchDetail();
  }, [roomId]);

  const handleBooking = () => {
    const msg = `Apakah Anda yakin ingin memesan Kamar ${room?.nomorKamar}?`;
    if (Platform.OS === "web") {
      if (window.confirm(msg)) {
        alert(
          "Permintaan booking berhasil dikirim! Silahkan tunggu konfirmasi admin."
        );
      }
    } else {
      Alert.alert("Konfirmasi Booking", msg, [
        { text: "Batal", style: "cancel" },
        { text: "Ya, Pesan", onPress: () => alert("Permintaan terkirim!") },
      ]);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!room) return null;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Detail Kamar ${room.nomorKamar}`,
          headerShown: true,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Galeri Gambar Dummy */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageSlider}
        >
          <Image
            source={{ uri: `https://picsum.photos/seed/${room.id}1/800/600` }}
            style={styles.detailImage}
          />
          <Image
            source={{ uri: `https://picsum.photos/seed/${room.id}2/800/600` }}
            style={styles.detailImage}
          />
          <Image
            source={{ uri: `https://picsum.photos/seed/${room.id}3/800/600` }}
            style={styles.detailImage}
          />
        </ScrollView>

        <View style={styles.mainContent}>
          {/* Header Info */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text variant="headlineMedium" style={styles.bold}>
                Kamar {room.nomorKamar}
              </Text>
              <Text variant="bodyMedium" style={{ color: "#666" }}>
                📍 Bandar Lampung, Indonesia
              </Text>
            </View>
            <Chip
              textStyle={{ color: "#fff", fontWeight: "bold" }}
              style={{
                backgroundColor:
                  room.statusKamar === "Tersedia" ? "#4CAF50" : "#F44336",
              }}
            >
              {room.statusKamar}
            </Chip>
          </View>

          <Divider style={styles.divider} />

          {/* Harga Section */}
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Harga Sewa
          </Text>
          <Text variant="headlineSmall" style={styles.priceText}>
            Rp {room.hargaSewa.toLocaleString("id-ID")}
            <Text
              variant="bodyLarge"
              style={{ fontWeight: "normal", color: "#666" }}
            >
              {" "}
              / bulan
            </Text>
          </Text>

          <Divider style={styles.divider} />

          {/* Fasilitas & Perabotan (Manual/Dummy based on previous steps) */}
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Fasilitas Kamar
          </Text>
          <View style={styles.facilityGrid}>
            <View style={styles.facilityItem}>
              <MaterialCommunityIcons
                name="bed-king-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text variant="bodySmall">Kasur</Text>
            </View>
            <View style={styles.facilityItem}>
              <MaterialCommunityIcons
                name="wardrobe-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text variant="bodySmall">Lemari</Text>
            </View>
            <View style={styles.facilityItem}>
              <MaterialCommunityIcons
                name="wifi"
                size={24}
                color={theme.colors.primary}
              />
              <Text variant="bodySmall">WiFi</Text>
            </View>
            <View style={styles.facilityItem}>
              <MaterialCommunityIcons
                name="fan"
                size={24}
                color={theme.colors.primary}
              />
              <Text variant="bodySmall">AC/Kipas</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Deskripsi */}
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Deskripsi
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {room.deskripsi || "Tidak ada deskripsi tambahan untuk kamar ini."}
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button untuk Booking */}
      <View style={styles.bottomActions}>
        <View style={{ flex: 1 }}>
          <Text variant="labelLarge" style={{ color: "#666" }}>
            Total Harga
          </Text>
          <Text
            variant="titleLarge"
            style={[styles.bold, { color: theme.colors.primary }]}
          >
            Rp {room.hargaSewa.toLocaleString("id-ID")}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleBooking}
          disabled={room.statusKamar !== "Tersedia"}
          contentStyle={{ height: 50 }}
          style={{ flex: 1.2, borderRadius: 10 }}
        >
          Booking Sekarang
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageSlider: { height: 250 },
  detailImage: { width: width, height: 250 },
  mainContent: { padding: 20 },
  bold: { fontWeight: "bold" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  divider: { marginVertical: 15 },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  priceText: { color: "#E64A19", fontWeight: "bold" },
  facilityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 5,
  },
  facilityItem: { alignItems: "center", width: 60 },
  description: { color: "#444", lineHeight: 22 },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 10,
  },
});
