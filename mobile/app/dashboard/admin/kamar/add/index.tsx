import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import {
  TextInput,
  Button,
  Text,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { useRouter, Stack } from "expo-router";
import { kamarService } from "@/services/kamarService";
import { StatusKamar } from "@/types/interfaces";
import { formatRibuan, filterHargaRaw } from "@/utils/script";

export default function KamarAdd() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [nomorKamar, setNomorKamar] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [statusKamar, setStatusKamar] = useState<StatusKamar>("Tersedia");
  const [deskripsi, setDeskripsi] = useState("");

  const handleChangeHarga = (text: string) => {
    const formatted = formatRibuan(text);
    setHargaSewa(formatted);
  };

  const handleSubmit = async () => {
    if (!nomorKamar || !hargaSewa) {
      if (Platform.OS === "web") alert("Nomor Kamar dan Harga wajib diisi");
      else Alert.alert("Validasi", "Nomor Kamar dan Harga wajib diisi");
      return;
    }

    setLoading(true);

    const cleanHarga = parseInt(filterHargaRaw(hargaSewa));

    const payload = {
      nomorKamar,
      hargaSewa: cleanHarga,
      statusKamar,
      deskripsi,
    };

    try {
      await kamarService.create(payload);

      const message = "Kamar baru berhasil ditambahkan";
      if (Platform.OS === "web") {
        alert(message);
        router.replace("/dashboard/admin/kamar");
      } else {
        Alert.alert("Sukses", message, [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard/admin/kamar"),
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
        options={{
          title: "Tambah Kamar",
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text
          variant="headlineSmall"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Tambah Kamar Baru
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
          value={hargaSewa}
          onChangeText={handleChangeHarga}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
          left={<TextInput.Affix text="Rp " />}
          maxLength={10}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Status Kamar
        </Text>
        <SegmentedButtons
          value={statusKamar}
          onValueChange={(val) => setStatusKamar(val as StatusKamar)}
          buttons={[
            { value: "Tersedia", label: "Tersedia" },
            { value: "Tersewa", label: "Tersewa" },
            { value: "TidakTersedia", label: "Tidak Tersedia" },
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
  title: { marginBottom: 24, fontWeight: "bold", textAlign: "center" },
  input: { marginBottom: 16, backgroundColor: "white" },
  label: { marginBottom: 8, fontWeight: "bold", color: "#555" },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  btnKembali: { flex: 1, borderColor: "#6200ee" },
  btnSimpan: { flex: 1 },
});
