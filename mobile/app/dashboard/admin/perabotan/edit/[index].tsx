import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { perabotanService } from "@/services/perabotanService";

export default function PerabotanEdit() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const perabotanId = Number(index);

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const [namaPerabotan, setNamaPerabotan] = useState("");
  const [kodePerabotan, setKodePerabotan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await perabotanService.getById(perabotanId);
        if (result) {
          setNamaPerabotan(result.namaPerabotan);
          setKodePerabotan(result.kodePerabotan);
          setDeskripsi(result.deskripsi || "");
        }
      } catch (error) {
        router.back();
      } finally {
        setInitLoading(false);
      }
    };
    fetchDetail();
  }, [perabotanId]);

  const handleSubmit = async () => {
    if (!namaPerabotan || !kodePerabotan) return;
    setLoading(true);
    try {
      await perabotanService.update(perabotanId, {
        namaPerabotan,
        kodePerabotan,
        deskripsi,
      });
      router.replace("/dashboard/admin/perabotan");
    } catch (error) {
      Alert.alert("Error", "Gagal mengupdate");
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Edit Perabotan", headerShown: true }} />
      <ScrollView>
        <TextInput
          label="Kode Perabotan"
          value={kodePerabotan}
          onChangeText={setKodePerabotan}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Nama Perabotan"
          value={namaPerabotan}
          onChangeText={setNamaPerabotan}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Deskripsi"
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
            onPress={() => router.push("/dashboard/admin/perabotan")}
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
  input: { marginBottom: 16 },
  btnKembali: { flex: 1, borderColor: "#6200ee" },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  btnSimpan: { flex: 1 },
});
