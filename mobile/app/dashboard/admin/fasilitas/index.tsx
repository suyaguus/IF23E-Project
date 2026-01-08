import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert, RefreshControl, Platform } from "react-native";
import { Card, Text, FAB, IconButton, ActivityIndicator, useTheme, Searchbar } from "react-native-paper";
import { useRouter, useFocusEffect, Route } from "expo-router";
import { fasilitasService } from "@/services/fasilitasService"; 
import { Fasilitas } from "@/types/interfaces"; 

export default function FasilitasList() {
  const theme = useTheme();
  const router = useRouter();

  const [data, setData] = useState<Fasilitas[]>([]);
  const [filteredData, setFilteredData] = useState<Fasilitas[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fasilitasService.getAll();
      setData(response); 
      setFilteredData(response);
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = data.filter((item) =>
        item.namaFasilitas.toUpperCase().includes(text.toUpperCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const handleDelete = (id: number, nama: string) => {
    // Logic Web
    if (Platform.OS === 'web') {
        const confirm = window.confirm(`Yakin ingin menghapus fasilitas ${nama}?`);
        if (confirm) executeDelete(id);
        return;
    }

    // Logic Mobile
    Alert.alert("Konfirmasi Hapus", `Yakin ingin menghapus fasilitas ${nama}?`, [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => executeDelete(id) },
    ]);
  };

  const executeDelete = async (id: number) => {
    try {
      await fasilitasService.delete(id);
      if (Platform.OS === 'web') alert("Data berhasil dihapus");
      else Alert.alert("Sukses", "Data berhasil dihapus");
      fetchData();
    } catch (error: any) {
      const msg = error.message || "Gagal menghapus data";
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert("Gagal", msg);
    }
  };

  const renderItem = ({ item }: { item: Fasilitas }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            {item.namaFasilitas}
          </Text>
        </View>
        {item.deskripsi ? (
          <Text variant="bodyMedium" numberOfLines={2} style={{ color: "gray", marginTop: 4 }}>
            Kode: {item.kodeFasilitas}
          </Text>
        ) : (
          <Text variant="bodySmall" style={{ color: "#ccc", marginTop: 4 }}>
            Tidak ada deskripsi
          </Text>
        )}
      </Card.Content>
      <Card.Actions style={{ justifyContent: "flex-end" }}>
        <IconButton
          icon="pencil"
          mode="contained-tonal"
          iconColor={theme.colors.primary}
          size={20}
          onPress={() => router.push(`/dashboard/admin/fasilitas/edit/${item.id}` as any)}
        />
        <IconButton
          icon="delete"
          iconColor={theme.colors.error}
          onPress={() => handleDelete(item.id, item.namaFasilitas)}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Cari fasilitas..."
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ textAlign: "center", marginTop: 50, color: "#666" }}>
                {search ? "Fasilitas tidak ditemukan." : "Belum ada data fasilitas.\nTekan tombol + untuk menambah."}
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
        onPress={() => router.push("/dashboard/admin/fasilitas/add" as Route)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchBar: { marginBottom: 16, backgroundColor: "white", elevation: 2, borderRadius: 8 },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});