import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRouter, Stack } from "expo-router";
import { fasilitasService } from "@/services/fasilitasService";

export default function FasilitasAdd() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [namaFasilitas, setNamaFasilitas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kodeFasilitas, setKodeFasilitas] = useState("");

  const handleSubmit = async () => {
    if (!namaFasilitas) {
      if (Platform.OS === "web") alert("Nama Fasilitas wajib diisi");
      else Alert.alert("Validasi", "Nama Fasilitas wajib diisi");
      return;
    }

    setLoading(true);
    const payload = {
      namaFasilitas,
      kodeFasilitas, // Masukkan kode ini
      deskripsi,
    };

    try {
      await fasilitasService.create(payload);
      const msg = "Fasilitas berhasil ditambahkan";

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
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan";
      if (Platform.OS === "web") alert("Gagal: " + errorMsg);
      else Alert.alert("Gagal", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Tambah Fasilitas", headerShown: true }}
      />

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
          placeholder="Contoh: WiFi, Parkir Motor, AC"
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
            Kembali
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.btnSimpan}
          >
            Simpan Data
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { marginBottom: 16, backgroundColor: "white" },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  btnKembali: { flex: 1, borderColor: "#6200ee" },
  btnSimpan: { flex: 1 },
});
