import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { fasilitasService } from "@/services/fasilitasService";

export default function FasilitasEdit() {
  const theme = useTheme();
  const router = useRouter();

  // Menangkap parameter ID dengan aman
  const params = useLocalSearchParams();
  const rawId = params.index || params.id;
  const fasilitasId = Number(rawId);

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // State Form
  const [namaFasilitas, setNamaFasilitas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kodeFasilitas, setKodeFasilitas] = useState("");

  // Fetch Data Existing
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await fasilitasService.getById(fasilitasId);
        if (result) {
          setNamaFasilitas(result.namaFasilitas);
          setKodeFasilitas(result.kodeFasilitas); 
          setDeskripsi(result.deskripsi || "");
        }
      } catch (error) {
        console.error("Error fetch:", error);
        if (Platform.OS === "web") alert("Gagal memuat detail fasilitas");
        else Alert.alert("Error", "Gagal memuat detail fasilitas");
        router.back();
      } finally {
        setInitLoading(false);
      }
    };

    if (fasilitasId && !isNaN(fasilitasId)) {
      fetchDetail();
    } else {
      setInitLoading(false);
    }
  }, [fasilitasId]);

  const handleSubmit = async () => {
    if (!namaFasilitas || !kodeFasilitas) {
      const msg = "Nama dan Kode Fasilitas wajib diisi";
      if (Platform.OS === "web") alert(msg);
      else Alert.alert("Validasi", msg);
      return;
    }

    setLoading(true);
    const payload = {
      namaFasilitas,
      kodeFasilitas, 
      deskripsi,
    };

    try {
      console.log("Mengirim Update Payload:", payload); 
      await fasilitasService.update(fasilitasId, payload);

      const msg = "Data fasilitas berhasil diperbarui";
      if (Platform.OS === "web") {
        alert(msg);
        router.replace("/dashboard/admin/fasilitas");
      } else {
        Alert.alert("Sukses", msg, [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard/admin/fasilitas"),
          },
        ]);
      }
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Terjadi kesalahan server";
      console.error("Update Error:", error.response?.data);

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
      <Stack.Screen options={{ title: "Edit Fasilitas", headerShown: true }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TextInput
          label="Kode Fasilitas"
          placeholder="Contoh: F001"
          value={kodeFasilitas}
          onChangeText={setKodeFasilitas}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Nama Fasilitas"
          value={namaFasilitas}
          onChangeText={setNamaFasilitas}
          mode="outlined"
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
            onPress={() => router.push("/dashboard/admin/fasilitas")}
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
  input: { marginBottom: 16, backgroundColor: "white" },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  btnKembali: { flex: 1, borderColor: "#6200ee" },
  btnSimpan: { flex: 1 },
});
