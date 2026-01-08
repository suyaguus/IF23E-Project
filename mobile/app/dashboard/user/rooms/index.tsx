import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Text,
  Card,
  Searchbar,
  ActivityIndicator,
  useTheme,
  Chip,
} from "react-native-paper";
import { useRouter, useFocusEffect, Route } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { Kamar } from "@/types/interfaces";

const { width } = Dimensions.get("window");

export default function UserRoomList() {
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
      const list = Array.isArray(result) ? result : [];
      setData(list);
      setFilteredData(list);
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
    const query = text.toLowerCase().trim();
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        const matchNomor = item.nomorKamar.toLowerCase().includes(query);
        const matchHarga =
          item.hargaSewa.toString().includes(query) ||
          item.hargaSewa.toLocaleString("id-ID").includes(query);
        const matchStatus = item.statusKamar.toLowerCase().includes(query);
        return matchNomor || matchHarga || matchStatus;
      });
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }: { item: Kamar }) => (
    <Card
      style={styles.horizontalCard}
      onPress={() => router.push(`/dashboard/user/rooms/${item.id}` as Route)}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        <Card.Cover
          source={{ uri: `https://picsum.photos/seed/${item.id}1/600/400` }}
          style={styles.image}
        />
        <Card.Cover
          source={{ uri: `https://picsum.photos/seed/${item.id}2/600/400` }}
          style={styles.image}
        />
        <Card.Cover
          source={{ uri: `https://picsum.photos/seed/${item.id}3/600/400` }}
          style={styles.image}
        />
      </ScrollView>

      <Card.Content style={styles.content}>
        <View style={styles.headerRow}>
          <Text variant="titleLarge" style={styles.roomTitle}>
            Kamar {item.nomorKamar}
          </Text>
          <Chip
            textStyle={styles.chipText}
            style={[
              styles.statusChip,
              {
                backgroundColor:
                  item.statusKamar === "Tersedia" ? "#4CAF50" : "#F44336",
              },
            ]}
          >
            {item.statusKamar}
          </Chip>
        </View>

        <Text variant="bodySmall" style={styles.locationText}>
          📍 Tanjung Karang, Bandar Lampung
        </Text>

        <View style={styles.tagRow}>
          <Chip compact style={styles.tag}>
            Fasilitas Lengkap
          </Chip>
          <Chip compact style={styles.tag}>
            Gratis Listrik
          </Chip>
        </View>

        <View style={styles.priceContainer}>
          <Text variant="titleMedium" style={styles.priceText}>
            Rp {item.hargaSewa.toLocaleString("id-ID")}
            <Text variant="bodySmall" style={styles.perMonth}>
              {" "}
              / bulan
            </Text>
          </Text>
          {item.statusKamar === "Tersedia" && (
            <Text variant="labelSmall" style={styles.urgentText}>
              Tersisa 1 kamar!
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Cari nomor, harga, atau status..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchBar}
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
          contentContainerStyle={styles.listPadding}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  listPadding: { padding: 16, paddingBottom: 30 },
  searchBar: { margin: 16, marginBottom: 8, elevation: 2, borderRadius: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  horizontalCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  image: {
    width: width - 32,
    height: 200,
    borderRadius: 0,
  },
  content: { padding: 15 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomTitle: { fontWeight: "bold", color: "#333" },
  statusChip: { height: 28, justifyContent: "center" },
  chipText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  locationText: { color: "#666", marginTop: 4 },
  tagRow: { flexDirection: "row", marginTop: 10, gap: 5 },
  tag: { backgroundColor: "#f0f0f0" },
  priceContainer: { marginTop: 15, alignItems: "flex-end" },
  priceText: { color: "#E64A19", fontWeight: "bold", fontSize: 18 },
  perMonth: { color: "#666", fontSize: 12, fontWeight: "normal" },
  urgentText: { color: "#D32F2F", fontWeight: "bold", marginTop: 2 },
});
