import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import {
  Card,
  Text,
  FAB,
  IconButton,
  ActivityIndicator,
  useTheme,
  Chip,
  TextInput,
  Portal,
  Dialog,
  Button,
  Snackbar,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { Kamar, StatusKamar } from "@/types/interfaces";

export default function KamarList() {
  const theme = useTheme();
  const router = useRouter();

  // State Data
  const [data, setData] = useState<Kamar[]>([]);
  const [filteredData, setFilteredData] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // State Dialog & Snackbar
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedNomor, setSelectedNomor] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const messageResponse = useRef("");

  const fetchData = async () => {
    try {
      const result = await kamarService.getAll();
      const listKamar = Array.isArray(result) ? result : [];
      setData(listKamar);
      setFilteredData(listKamar); 
    } catch (error) {
      console.error(error);
      messageResponse.current = "Gagal memuat data kamar";
      setSnackbarVisible(true);
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

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const term = search.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.nomorKamar.toLowerCase().includes(term) ||
          item.statusKamar.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  const confirmDelete = (id: number, nomor: string) => {
    setSelectedId(id);
    setSelectedNomor(nomor);
    setDialogVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      // Panggil Service Delete
      await kamarService.delete(selectedId);

      messageResponse.current = "Data berhasil dihapus";
      setSnackbarVisible(true);
      fetchData(); // Reload data
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Gagal menghapus data";
      messageResponse.current = msg;
      setSnackbarVisible(true);
    } finally {
      setDialogVisible(false);
      setSelectedId(null);
    }
  };

  const getStatusColor = (status: StatusKamar | string) => {
    switch (status) {
      case "Tersedia":
        return "#4CAF50"; // Hijau
      case "Penuh":
        return "#F44336"; // Merah
      case "Perbaikan":
        return "#FF9800"; // Oranye
      default:
        return "#9E9E9E"; // Abu-abu
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const renderItem = ({ item }: { item: Kamar }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Kamar {item.nomorKamar}
          </Text>
          <Chip
            style={{
              backgroundColor: getStatusColor(item.statusKamar),
              height: 32,
            }}
            textStyle={{ color: "white", fontSize: 12, fontWeight: "bold" }}
            icon={() => (
              <MaterialIcons
                name={
                  item.statusKamar === "Tersedia"
                    ? "check-circle"
                    : item.statusKamar === "Penuh"
                    ? "cancel"
                    : "build"
                }
                size={16}
                color="white"
              />
            )}
          >
            {item.statusKamar}
          </Chip>
        </View>

        <Text
          variant="bodyLarge"
          style={{
            marginTop: 8,
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          {formatRupiah(item.hargaSewa)} / bulan
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

      <Card.Actions style={{ justifyContent: "flex-end", paddingTop: 0 }}>
        {/* Tombol Edit */}
        <IconButton
          icon="pencil"
          mode="contained-tonal"
          iconColor={theme.colors.primary}
          size={20}
          onPress={() =>
            router.push({
              pathname: "/dashboard/admin/kamar/form",
              params: { id: item.id },
            })
          }
        />
        {/* Tombol Hapus */}
        <IconButton
          icon="delete"
          mode="contained-tonal"
          containerColor="#FFEBEE"
          iconColor={theme.colors.error}
          size={20}
          onPress={() => confirmDelete(item.id, item.nomorKamar)}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Cari Nomor Kamar atau Status..."
        mode="flat"
        left={<TextInput.Icon icon="magnify" />}
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 10 }}>Memuat data...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <MaterialIcons name="inbox" size={60} color="#ccc" />
              <Text
                style={{ textAlign: "center", marginTop: 10, color: "#888" }}
              >
                {search ? "Kamar tidak ditemukan" : "Belum ada data kamar"}
              </Text>
            </View>
          }
        />
      )}

      {/* FAB Tambah */}
      <FAB
        icon="plus"
        label="Tambah"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="white"
        onPress={() => router.push("/dashboard/admin/kamar/form")}
      />

      {/* Dialog Konfirmasi Hapus */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Konfirmasi Hapus</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Apakah Anda yakin ingin menghapus data kamar{" "}
              <Text style={{ fontWeight: "bold" }}>{selectedNomor}</Text>?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)} textColor="gray">
              Batal
            </Button>
            <Button onPress={handleDelete} textColor={theme.colors.error}>
              Ya, Hapus
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Snackbar Notifikasi */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Tutup",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {messageResponse.current}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchBar: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});
