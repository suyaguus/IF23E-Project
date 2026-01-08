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
  Searchbar,
} from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { Kamar } from "@/types/interfaces";

export default function KamarList() {
  const theme = useTheme();
  const router = useRouter();

  const [data, setData] = useState<Kamar[]>([]);
  const [filteredData, setFilteredData] = useState<Kamar[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.nomorKamar.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearch("");
    fetchData();
  };

  const handleDelete = (id: number, nomor: string) => {
    if (Platform.OS === "web") {
      const confirm = window.confirm(`Yakin ingin menghapus kamar ${nomor}?`);
      if (confirm) {
        executeDelete(id);
      }
      return;
    }

    Alert.alert("Konfirmasi Hapus", `Yakin ingin menghapus kamar ${nomor}?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => executeDelete(id),
      },
    ]);
  };

  const executeDelete = async (id: number) => {
    try {
      await kamarService.delete(id);
      if (Platform.OS === "web") {
        alert("Data berhasil dihapus");
      } else {
        Alert.alert("Sukses", "Data berhasil dihapus");
      }
      fetchData();
    } catch (error: any) {
      const errMsg = error.message || "Gagal menghapus";
      if (Platform.OS === "web") alert(errMsg);
      else Alert.alert("Gagal", errMsg);
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
      <Searchbar
        placeholder="Cari Nomor Kamar..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchBar}
        mode="bar"
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
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
                {search.length > 0
                  ? `Kamar "${search}" tidak ditemukan.`
                  : "Belum ada data kamar.\nTekan tombol + untuk menambah."}
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
  searchBar: {
    marginBottom: 16,
    elevation: 2,
    backgroundColor: "white",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});
