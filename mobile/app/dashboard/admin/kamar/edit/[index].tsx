import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { TextInput, Button, Text, SegmentedButtons, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { StatusKamar } from "@/types/interfaces";

export default function KamarEdit() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const kamarId = Number(id);

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // State Form
  const [nomorKamar, setNomorKamar] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [statusKamar, setStatusKamar] = useState<StatusKamar>("Tersedia");
  const [deskripsi, setDeskripsi] = useState("");

  // Fetch Data Existing
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await kamarService.getById(kamarId);
        if (data) {
          setNomorKamar(data.nomorKamar);
          setHargaSewa(data.hargaSewa.toString());
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

    if (kamarId) {
      fetchDetail();
    }
  }, [kamarId]);

  const handleSubmit = async () => {
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
      await kamarService.update(kamarId, payload);
      Alert.alert("Sukses", "Data kamar berhasil diperbarui", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Gagal", error.response?.data?.message || "Terjadi kesalahan");
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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.primary }]}>
          Edit Data Kamar
        </Text>

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
          value={deskripsi}
          onChangeText={setDeskripsi}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <View style={{ gap: 10 }}>
            <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.btnSimpan}
            >
            Simpan Perubahan
            </Button>

            <Button
            mode="outlined"
            onPress={() => router.back()}
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
  btnSimpan: { marginTop: 10, borderRadius: 8, paddingVertical: 6 },
});