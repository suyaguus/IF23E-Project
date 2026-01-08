import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert, RefreshControl, Platform } from "react-native";
import { Card, Text, FAB, IconButton, ActivityIndicator, useTheme, Searchbar } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
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
      const filtered = data.filter((item) =>
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
      if (Platform.OS === 'web') alert("Data berhasil dihapus");
      else Alert.alert("Sukses", "Data berhasil dihapus");
      fetchData();
    } catch (error: any) {
      const msg = error.message || "Gagal menghapus";
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert("Gagal", msg);
    }
  };

  const renderItem = ({ item }: { item: Perabotan }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.rowBetween}>
          <View>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>{item.namaPerabotan}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>{item.kodePerabotan}</Text>
          </View>
        </View>
        {item.deskripsi ? (
          <Text variant="bodySmall" style={{ marginTop: 8, color: "gray" }}>{item.deskripsi}</Text>
        ) : null}
      </Card.Content>
      <Card.Actions>
        <IconButton 
          icon="pencil" 
          size={20} 
          onPress={() => router.push(`/dashboard/admin/perabotan/edit/${item.id}` as any)} 
        />
        <IconButton 
          icon="delete" 
          iconColor={theme.colors.error} 
          onPress={() => {
            if (Platform.OS === 'web') {
              if (window.confirm("Hapus perabotan ini?")) executeDelete(item.id);
            } else {
              Alert.alert("Hapus", "Yakin hapus data ini?", [
                { text: "Batal", style: "cancel" },
                { text: "Hapus", onPress: () => executeDelete(item.id), style: "destructive" }
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
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
        />
      )}
      <FAB
        icon="plus"
        label="Tambah"
        style={styles.fab}
        onPress={() => router.push("/dashboard/admin/perabotan/add")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  searchBar: { marginBottom: 16, backgroundColor: "white" },
  card: { marginBottom: 12, backgroundColor: "white", borderRadius: 12 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});