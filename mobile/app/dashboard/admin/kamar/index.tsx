import React, { useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
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
  const [filteredData, setFilteredData] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedNomor, setSelectedNomor] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const messageResponse = useRef("");

  // Fungsi untuk mengambil data dari backend
  const fetchData = async () => {
    try {
      const result = await kamarService.getAll();
      const listKamar = Array.isArray(result) ? result : [];
      setData(listKamar);
      setFilteredData(listKamar);
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
    Alert.alert("Konfirmasi Hapus", `Yakin ingin menghapus kamar ${nomor}?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            await kamarService.delete(id);
            Alert.alert("Sukses", "Data berhasil dihapus");
            fetchData(); // Reload data setelah hapus
          } catch (error: any) {
            Alert.alert("Gagal", error.message || "Tidak bisa menghapus data");
          }
        },
      },
    ]);
  };

  // Helper warna status
  const getStatusColor = (status: string) => {
    // Normalisasi string (hilangkan spasi & lowercase) untuk pencocokan yang lebih aman
    const safeStatus = status ? status.replace(/\s/g, "").toLowerCase() : "";

    switch (safeStatus) {
      case "tersedia":
        return "#4CAF50"; // Hijau
      case "tersewa":
      case "penuh":
        return "#F44336"; // Merah
      case "tidaktersedia":
      case "perbaikan":
      case "rusak":
        return "#9E9E9E"; // Abu-abu
      default:
        return "#9E9E9E"; // Default Abu-abu
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
          // Menggunakan path absolute agar lebih aman
          onPress={() => router.push(`/dashboard/admin/kamar/edit/${item.id}`)}
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
        // Menggunakan path absolute
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
