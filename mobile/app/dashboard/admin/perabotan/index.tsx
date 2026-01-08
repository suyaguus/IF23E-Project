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
  Searchbar,
} from "react-native-paper";
import { useRouter, useFocusEffect, Route } from "expo-router";
import { perabotanService } from "@/services/perabotanService";
import { Perabotan } from "@/types/interfaces";

export default function PerabotanList() {
  const theme = useTheme();
  const router = useRouter();

  const [data, setData] = useState<Perabotan[]>([]);
  const [filteredData, setFilteredData] = useState<Perabotan[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await perabotanService.getAll();
      const validData = Array.isArray(response) ? response : [];
      setData(validData);
      setFilteredData(validData);
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
      setSearch("");
    }, [])
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filtered = data.filter(
        (item) =>
          item.namaPerabotan.toLowerCase().includes(text.toLowerCase()) ||
          item.kodePerabotan.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const executeDelete = async (id: number) => {
    try {
      await perabotanService.delete(id);
      if (Platform.OS === "web") alert("Data berhasil dihapus");
      else Alert.alert("Sukses", "Data berhasil dihapus");
      fetchData();
    } catch (error: any) {
      const msg = error.message || "Gagal menghapus";
      if (Platform.OS === "web") alert(msg);
      else Alert.alert("Gagal", msg);
    }
  };

  const renderItem = ({ item }: { item: Perabotan }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.rowBetween}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              {item.namaPerabotan}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.primary, marginTop: 2 }}
            >
              Kode: {item.kodePerabotan}
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="pencil"
          size={20}
          iconColor={theme.colors.primary}
          onPress={() =>
            router.push(`/dashboard/admin/perabotan/edit/${item.id}` as any)
          }
        />
        <IconButton
          icon="delete"
          iconColor={theme.colors.error}
          onPress={() => {
            if (Platform.OS === "web") {
              if (window.confirm(`Hapus perabotan ${item.namaPerabotan}?`))
                executeDelete(item.id);
            } else {
              Alert.alert("Hapus", `Yakin hapus ${item.namaPerabotan}?`, [
                { text: "Batal", style: "cancel" },
                {
                  text: "Hapus",
                  onPress: () => executeDelete(item.id),
                  style: "destructive",
                },
              ]);
            }
          }}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Cari perabotan..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchBar}
        inputStyle={{ minHeight: 0 }}
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
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text
                style={{ textAlign: "center", marginTop: 50, color: "#666" }}
              >
                {search ? "Data tidak ditemukan." : "Belum ada data perabotan."}
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
        onPress={() => router.push("/dashboard/admin/perabotan/add" as Route)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchBar: {
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 8,
  },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});
