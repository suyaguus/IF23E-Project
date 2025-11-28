import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
  Chip,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { router } from "expo-router";
import { Strings } from "@/constants/strings";
import { styles } from "@/styles/dashboard";
import { formatRupiah } from "@/utils/script";

export default function KamarPage() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const showSnackbar = () => setVisibleSnackbar(true);

  const hideSnackbar = () => setVisibleSnackbar(false);

  // buat react hook (useState)
  const [dataKamar, setDataKamar] = useState<
    {
      id: number;
      nomorKamar: string;
      hargaSewa: number;
      statusKamar: string;
      deskripsi: string;
      orders: string;
      fasilitas: string;
      perabotan: string;
      riwayatPembayaran: string;
    }[]
  >([]);

  // State untuk Pencarian
  const [search, setSearch] = useState("");

  // State filter data pencarian
  const [filter, setFilter] = useState<typeof dataKamar>([]);

  // state untuk simpan id kamar
  const [id, setId] = useState(0);

  // State untuk loading
  const [loading, setLoading] = useState(false);

  // buat useRef untuk menampilkan pesan hapus data
  const message = useRef("");
  // buat useRef untuk menampilkan respon hapus data
  const messageResponse = useRef("");

  // Fungsi untuk mendapatkan warna status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "tersedia":
        return "#4CAF50"; // Hijau
      case "tersewa":
        return "#F44336"; // Merah
      case "tidaktersedia":
      case "tidak tersedia":
        return "#9E9E9E"; // Abu-abu
      default:
        return "#9E9E9E"; // Default abu-abu
    }
  };

  // Fungsi untuk format text status
  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "tersedia":
        return "Tersedia";
      case "tersewa":
        return "Tersewa";
      case "tidaktersedia":
      case "tidak tersedia":
        return "Tidak Tersedia";
      default:
        return status;
    }
  };

  // buat react hook (useEffect)
  useEffect(() => {
    getDataKamar();
  }, []);

  useEffect(() => {
    // jika search data di isi
    if (search.toLowerCase().trim() !== "") {
      // Lakukan Pencarian dan filter data berdasarkan nomorKamar
      const filter_data = dataKamar.filter((item) => {
        const nomorKamar = item.nomorKamar.toLowerCase();
        const status = item.statusKamar.toLowerCase();
        const searchTerm = search.toLowerCase();
        
        return (
          nomorKamar.includes(searchTerm) ||
          status.includes(searchTerm)
        );
      });

      // Tampilkan data kamar berdasarkan pencarian
      setFilter(filter_data);
    }
    // jika pencarian data tidak di isi
    else {
      // Tampilkan Seluruh data
      setFilter(dataKamar);
    }
  }, [search, dataKamar]);

  // koneksi api dengan axios
  // buat fungsi koneksi api dengan axios
  const getDataKamar = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Strings.api_kamar);
      setDataKamar(response.data.kamar);
    } catch (error) {
      console.error("Error fetching data:", error);
      messageResponse.current = "Gagal mengambil data";
      showSnackbar();
    } finally {
      setLoading(false);
    }
  };

  const setMessage = (text: string) => {
    message.current = "Data Kamar : " + text + " ingin dihapus ?";
  };

  // buat fungsi untuk hapus data
  const deleteDataKamar = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${Strings.api_kamar}/${id}`);

      // tampilkan response (message)
      messageResponse.current = response.data.message;
      showSnackbar();

      // Refresh data setelah berhasil hapus
      await getDataKamar();
    } catch (error: any) {
      console.error("Error deleting data:", error);
      messageResponse.current = error.response?.data?.message || "Gagal menghapus data";
      showSnackbar();
    } finally {
      setLoading(false);
      hideDialog();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", width: "100%" }}>
      {/* area pencarian */}
      <TextInput
        label="Cari Nomor Kamar atau Status"
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="search"
                size={24}
                color="black"
              />
            )}
          />
        }
        style={{ fontSize: 16, backgroundColor: "#fff" }}
        value={search}
        onChangeText={(text) => setSearch(text)}
        editable={!loading}
      />

      {/* area content */}
      <FlatList
        style={{ backgroundColor: "#f5f5f5" }}
        data={filter}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={`Kamar ${item.nomorKamar}`}
              subtitle={formatRupiah(item.hargaSewa)}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
              right={(props) => (
                <Chip
                  style={{
                    backgroundColor: getStatusColor(item.statusKamar),
                    marginRight: 15,
                  }}
                  textStyle={{ 
                    color: "#fff", 
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                  icon={() => (
                    <MaterialIcons
                      name={
                        item.statusKamar.toLowerCase() === "tersedia"
                          ? "check-circle"
                          : item.statusKamar.toLowerCase() === "tersewa"
                          ? "cancel"
                          : "remove-circle"
                      }
                      size={18}
                      color="#fff"
                    />
                  )}
                >
                  {formatStatus(item.statusKamar)}
                </Chip>
              )}
            />
            <Card.Actions>
              <Button
                style={[styles.button, { backgroundColor: "#0046FF" }]}
                onPress={() => {
                  setId(item.id);
                  setMessage(item.nomorKamar);
                  showDialog();
                }}
                disabled={loading}
              >
                <MaterialIcons name="delete" size={24} color="white" />
              </Button>

              <Button
                style={[styles.buttonWhite, { backgroundColor: "white" }]}
                onPress={() => router.push(`/kamar/detail/page?id=${item.id}`)}
                disabled={loading}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles_local.emptyContainer}>
            <MaterialIcons name="inbox" size={80} color="#ccc" />
            <Text style={styles_local.emptyText}>
              {search ? "Tidak ada kamar yang ditemukan" : "Belum ada data kamar"}
            </Text>
          </View>
        }
      />

      {/* area FAB */}
      <FAB
        icon="plus"
        color="#fff"
        mode="flat"
        style={styles.fab}
        onPress={() => router.push("/kamar/add/page")}
        disabled={loading}
      />

      {/* area dialog hapus data */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.warna_bg}>Konfirmasi Hapus</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message.current}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              disabled={loading}
              textColor="#666"
            >
              Tidak
            </Button>
            <Button
              onPress={() => {
                deleteDataKamar(id);
              }}
              disabled={loading}
              textColor="#F44336"
              style={{ marginLeft: 8 }}
            >
              {loading ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* area snackbar (respon dari hapus data) */}
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={hideSnackbar}
        duration={3000}
        style={styles.snackbar}
      >
        {messageResponse.current}
      </Snackbar>
    </View>
  );
}

const styles_local = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
});