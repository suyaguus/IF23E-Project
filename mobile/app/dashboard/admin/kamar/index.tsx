import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import {
  Card,
  Text,
  FAB,
  IconButton,
  ActivityIndicator,
  useTheme,
  Chip,
} from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { Kamar } from "@/types/interfaces";

export default function KamarList() {
  const theme = useTheme();
  const router = useRouter();
  const [data, setData] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi untuk mengambil data dari backend
  const fetchData = async () => {
    try {
      const result = await kamarService.getAll();
      const listKamar = Array.isArray(result) ? result : [];
      setData(listKamar);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleDelete = (id: number, nomor: string) => {
    // LOGIC KHUSUS WEB
    if (Platform.OS === "web") {
      const confirm = window.confirm(`Yakin ingin menghapus kamar ${nomor}?`);
      if (confirm) {
        executeDelete(id);
      }
      return; // Berhenti di sini jika web
    }

    // LOGIC UNTUK HP (ANDROID/IOS)
    Alert.alert("Konfirmasi Hapus", `Yakin ingin menghapus kamar ${nomor}?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => executeDelete(id),
      },
    ]);
  };

  // Pindahkan logika penghapusan ke fungsi terpisah agar bisa dipanggil Web & Mobile
  const executeDelete = async (id: number) => {
    try {
      console.log("Menghapus ID:", id);
      await kamarService.delete(id);

      if (Platform.OS === "web") {
        alert("Data berhasil dihapus");
      } else {
        Alert.alert("Sukses", "Data berhasil dihapus");
      }

      fetchData(); // Refresh list
    } catch (error: any) {
      console.error("Gagal hapus:", error);
      const errMsg = error.message || "Gagal menghapus";

      if (Platform.OS === "web") {
        alert(errMsg);
      } else {
        Alert.alert("Gagal", errMsg);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const safeStatus = status ? status.replace(/\s/g, "").toLowerCase() : "";
    switch (safeStatus) {
      case "tersedia":
        return "#4CAF50";
      case "tersewa":
      case "penuh":
        return "#F44336";
      case "tidaktersedia":
      case "perbaikan":
      case "rusak":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const formatStatusLabel = (status: string) => {
    if (status === "TidakTersedia" || status === "tidaktersedia")
      return "Tidak Tersedia";
    return status;
  };

  const renderItem = ({ item }: { item: Kamar }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            {item.nomorKamar}
          </Text>
          <Chip
            textStyle={{ color: "white", fontSize: 12, fontWeight: "bold" }}
            style={{
              backgroundColor: getStatusColor(item.statusKamar),
              height: 32,
            }}
          >
            {formatStatusLabel(item.statusKamar)}
          </Chip>
        </View>
        <Text
          variant="bodyMedium"
          style={{
            marginTop: 8,
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          Rp {item.hargaSewa.toLocaleString("id-ID")} / bulan
        </Text>
        {item.deskripsi ? (
          <Text
            variant="bodySmall"
            numberOfLines={2}
            style={{ color: "gray", marginTop: 4 }}
          >
            {item.deskripsi}
          </Text>
        ) : null}
      </Card.Content>
      <Card.Actions style={{ justifyContent: "flex-end" }}>
        <IconButton
          icon="pencil"
          mode="contained-tonal"
          iconColor={theme.colors.primary}
          size={20}
          onPress={() =>
            router.push(`/dashboard/admin/kamar/edit/${item.id}` as any)
          }
        />
        <IconButton
          icon="delete"
          iconColor={theme.colors.error}
          onPress={() => handleDelete(item.id, item.nomorKamar)}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text
                style={{ textAlign: "center", marginTop: 50, color: "#666" }}
              >
                Belum ada data kamar.{"\n"}Tekan tombol + untuk menambah.
              </Text>
            </View>
          }
        />
      )}

      <FAB
        icon="plus"
        label="Tambah"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="white"
        onPress={() => router.push("/dashboard/admin/kamar/add")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});
