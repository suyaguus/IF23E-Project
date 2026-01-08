import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { TextInput, Button, Stack } from "react-native-paper";
import { useRouter, Stack as ExpoStack } from "expo-router";
import { perabotanService } from "@/services/perabotanService";

export default function PerabotanAdd() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [namaPerabotan, setNamaPerabotan] = useState("");
  const [kodePerabotan, setKodePerabotan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async () => {
    if (!namaPerabotan || !kodePerabotan) {
      const msg = "Nama dan Kode wajib diisi";
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert("Validasi", msg);
      return;
    }

    setLoading(true);
    try {
      await perabotanService.create({ namaPerabotan, kodePerabotan, deskripsi });
      if (Platform.OS === 'web') {
        alert("Data Berhasil Disimpan");
        router.replace("/dashboard/admin/perabotan");
      } else {
        Alert.alert("Sukses", "Data Berhasil Disimpan", [
          { text: "OK", onPress: () => router.replace("/dashboard/admin/perabotan") }
        ]);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menyimpan";
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert("Gagal", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ExpoStack.Screen options={{ title: "Tambah Perabotan", headerShown: true }} />
      <ScrollView>
        <TextInput label="Kode Perabotan" value={kodePerabotan} onChangeText={setKodePerabotan} mode="outlined" style={styles.input} />
        <TextInput label="Nama Perabotan" value={namaPerabotan} onChangeText={setNamaPerabotan} mode="outlined" style={styles.input} />
        <TextInput label="Deskripsi" value={deskripsi} onChangeText={setDeskripsi} mode="outlined" multiline numberOfLines={4} style={styles.input} />
        
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => router.back()} style={{ flex: 1 }}>Batal</Button>
          <Button mode="contained" onPress={handleSubmit} loading={loading} style={{ flex: 1 }}>Simpan</Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { marginBottom: 16 },
  row: { flexDirection: "row", gap: 10, marginTop: 10 }
});