import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  SegmentedButtons,
  useTheme
} from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { StatusKamar } from "@/types/interfaces";

export default function KamarForm() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Konversi ID ke number jika ada
  const id = params.id ? Number(params.id) : null; 
  const isEditMode = !!id; // Boolean: true jika edit, false jika tambah

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(isEditMode);

  // State Form Input
  const [nomorKamar, setNomorKamar] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [statusKamar, setStatusKamar] = useState<StatusKamar>("Tersedia");
  const [deskripsi, setDeskripsi] = useState("");

  // USE EFFECT: Jika mode edit, ambil data lama dari server
  useEffect(() => {
    if (isEditMode) {
      const fetchDetail = async () => {
        try {
          const data = await kamarService.getById(id);
          if (data) {
            setNomorKamar(data.nomorKamar);
            setHargaSewa(data.hargaSewa.toString());
            // Casting tipe string dari backend ke tipe StatusKamar
            setStatusKamar((data.statusKamar as StatusKamar) || "Tersedia");
            setDeskripsi(data.deskripsi || "");
          }
        } catch (error) {
          Alert.alert("Error", "Gagal memuat detail kamar");
          router.back();
        } finally {
          setInitLoading(false);
        }
      };
      fetchDetail();
    }
  }, [id]);

  const handleSubmit = async () => {
    // Validasi Sederhana
    if (!nomorKamar || !hargaSewa) {
      Alert.alert("Validasi", "Nomor Kamar dan Harga wajib diisi");
      return;
    }

    setLoading(true);

    const payload = {
      nomorKamar,
      hargaSewa: parseInt(hargaSewa),
      statusKamar,
      deskripsi,
    };

    try {
      if (isEditMode) {
        // Mode Edit: Panggil update
        await kamarService.update(id, payload);
        Alert.alert("Sukses", "Data kamar berhasil diperbarui", [
            { text: "OK", onPress: () => router.back() }
        ]);
      } else {
        // Mode Tambah: Panggil create
        await kamarService.create(payload);
        Alert.alert("Sukses", "Kamar baru berhasil ditambahkan", [
            { text: "OK", onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Terjadi kesalahan pada server";
      Alert.alert("Gagal", msg);
    } finally {
      setLoading(false);
    }
  };

  // Tampilan Loading saat mengambil data edit
  if (initLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10 }}>Memuat data kamar...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.primary }]}>
          {isEditMode ? "Edit Kamar" : "Tambah Kamar Baru"}
        </Text>

        <TextInput
          label="Nomor Kamar"
          placeholder="Contoh: A-101"
          value={nomorKamar}
          onChangeText={setNomorKamar}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Harga Sewa (Per Bulan)"
          placeholder="0"
          value={hargaSewa}
          onChangeText={setHargaSewa}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          left={<TextInput.Affix text="Rp " />}
        />

        <Text variant="bodyMedium" style={styles.label}>Status Kamar</Text>
        <SegmentedButtons
          value={statusKamar}
          onValueChange={(val) => setStatusKamar(val as StatusKamar)}
          buttons={[
            { value: "Tersedia", label: "Tersedia" },
            { value: "Penuh", label: "Penuh" },
            { value: "Perbaikan", label: "Rusak" },
          ]}
          style={styles.input}
        />

        <TextInput
          label="Deskripsi (Opsional)"
          placeholder="Contoh: Kamar luas dengan jendela menghadap taman..."
          value={deskripsi}
          onChangeText={setDeskripsi}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <View style={{ gap: 10, marginTop: 10 }}>
            <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.btnSimpan}
            contentStyle={{ paddingVertical: 5 }}
            >
            {isEditMode ? "Simpan Perubahan" : "Simpan Kamar"}
            </Button>

            <Button
            mode="outlined"
            onPress={() => router.back()}
            disabled={loading}
            style={{ borderColor: theme.colors.error }}
            textColor={theme.colors.error}
            >
            Batal
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
  label: { marginBottom: 8, fontWeight: "bold", color: '#555' },
  btnSimpan: { borderRadius: 8 },
});