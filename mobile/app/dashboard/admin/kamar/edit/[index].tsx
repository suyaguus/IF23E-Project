import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { StatusKamar } from "@/types/interfaces";
// Import utils yang sudah Anda buat
import { formatRibuan, filterHargaRaw } from "@/utils/script";

export default function KamarEdit() {
  const theme = useTheme();
  const router = useRouter();

  // 1. PERBAIKAN PARAMETER (Tangkap 'index' atau 'id')
  const params = useLocalSearchParams();
  const rawId = params.index || params.id; // Cek keduanya agar aman
  const kamarId = Number(rawId);

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // State Form
  const [nomorKamar, setNomorKamar] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [statusKamar, setStatusKamar] = useState<StatusKamar>("Tersedia");
  const [deskripsi, setDeskripsi] = useState("");

  // 2. FUNGSI HANDLE PERUBAHAN HARGA (Format Ribuan saat mengetik)
  const handleChangeHarga = (text: string) => {
    const formatted = formatRibuan(text);
    setHargaSewa(formatted);
  };

  // Fetch Data Existing
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log("Fetching ID:", kamarId); // Debugging
        const data = await kamarService.getById(kamarId);

        if (data) {
          setNomorKamar(data.nomorKamar);
          // Format harga dari database (integer) ke format ribuan (string)
          setHargaSewa(formatRibuan(data.hargaSewa.toString()));
          setStatusKamar((data.statusKamar as StatusKamar) || "Tersedia");
          setDeskripsi(data.deskripsi || "");
        }
      } catch (error) {
        console.error("Error fetch:", error);
        if (Platform.OS === "web") alert("Gagal memuat detail kamar");
        else Alert.alert("Error", "Gagal memuat detail kamar");
        router.back();
      } finally {
        setInitLoading(false); // Stop loading apapun yang terjadi
      }
    };

    // Pastikan ID valid sebelum fetch
    if (kamarId && !isNaN(kamarId)) {
      fetchDetail();
    } else {
      // Jika ID tidak ditemukan/invalid, stop loading agar tidak stuck
      console.log("ID Invalid:", rawId);
      setInitLoading(false);
    }
  }, [kamarId]);

  const handleSubmit = async () => {
    if (!nomorKamar || !hargaSewa) {
      const msg = "Nomor Kamar dan Harga wajib diisi";
      if (Platform.OS === "web") alert(msg);
      else Alert.alert("Validasi", msg);
      return;
    }

    setLoading(true);

    // 3. BERSIHKAN FORMAT HARGA SEBELUM UPDATE
    const cleanHarga = parseInt(filterHargaRaw(hargaSewa));

    const payload = {
      nomorKamar,
      hargaSewa: cleanHarga,
      statusKamar,
      deskripsi,
    };

    try {
      await kamarService.update(kamarId, payload);

      const msg = "Data kamar berhasil diperbarui";
      if (Platform.OS === "web") {
        alert(msg);
        router.replace("/dashboard/admin/kamar");
      } else {
        Alert.alert("Sukses", msg, [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard/admin/kamar"),
          },
        ]);
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Terjadi kesalahan";
      if (Platform.OS === "web") alert("Gagal: " + errMsg);
      else Alert.alert("Gagal", errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10 }}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Edit Kamar",
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Judul opsional, karena sudah ada di Header */}
        {/* <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.primary }]}>
          Edit Data Kamar
        </Text> */}

        <TextInput
          label="Nomor Kamar"
          value={nomorKamar}
          onChangeText={setNomorKamar}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Harga Sewa (Per Bulan)"
          value={hargaSewa}
          onChangeText={handleChangeHarga} // Pakai formatter
          mode="outlined"
          keyboardType="numeric" // atau number-pad
          style={styles.input}
          left={<TextInput.Affix text="Rp " />}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Status Kamar
        </Text>

        {/* 4. SAMAKAN OPSI STATUS DENGAN HALAMAN ADD */}
        <SegmentedButtons
          value={statusKamar}
          onValueChange={(val) => setStatusKamar(val as StatusKamar)}
          buttons={[
            { value: "Tersedia", label: "Tersedia" },
            { value: "Tersewa", label: "Tersewa" },
            { value: "TidakTersedia", label: "Tidak Tersedia" }, // Perbaiki value & label
          ]}
          style={styles.input}
        />

        <TextInput
          label="Deskripsi (Opsional)"
          value={deskripsi}
          onChangeText={setDeskripsi}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <View style={styles.actionContainer}>
          <Button
            mode="outlined"
            onPress={() => router.push("/dashboard/admin/kamar")}
            style={styles.btnKembali}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.btnSimpan}
          >
            Simpan Perubahan
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { marginBottom: 24, fontWeight: "bold", textAlign: "center" },
  input: { marginBottom: 16, backgroundColor: "white" },
  label: { marginBottom: 8, fontWeight: "bold", color: "#555" },
  // Style tombol disejajarkan
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  btnKembali: { flex: 1, borderColor: "#6200ee" },
  btnSimpan: { flex: 1 },
});
