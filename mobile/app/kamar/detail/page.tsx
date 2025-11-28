import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Strings } from "@/constants/strings";
import { styles } from "@/styles/dashboard";
import { filterHarga, filterHargaRaw, formatRibuan } from "@/utils/script";

export default function DetailKamarPage() {
  // Ambil ID dari parameter URL
  const { id } = useLocalSearchParams();

  // State untuk form
  const [formNomorKamar, setFormNomorKamar] = useState("");
  const [formHarga, setFormHarga] = useState("");
  const [formHargaRaw, setFormHargaRaw] = useState(0);
  const [formDeskripsi, setFormDeskripsi] = useState("");
  const [formStatusKamar, setFormStatusKamar] = useState("");

  // State untuk loading dan snackbar
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageResponse, setMessageResponse] = useState("");

  const showSnackbar = () => setVisibleSnackbar(true);
  const hideSnackbar = () => setVisibleSnackbar(false);

  // Fungsi untuk filter nomor kamar (hanya angka)
  const filterNomorKamar = (text: string) => {
    return text.replace(/[^0-9]/g, "");
  };

  // Ambil data kamar saat halaman dimuat
  useEffect(() => {
    if (id) {
      getDataKamar();
    }
  }, [id]);

  // Fungsi untuk mengambil data kamar berdasarkan ID
  const getDataKamar = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Strings.api_kamar}/${id}`);

      // API mengembalikan response.data.data sesuai struktur API
      const kamar = response.data.data;

      if (!kamar) {
        throw new Error("Data kamar tidak ditemukan");
      }

      // Set data ke form (gunakan field yang benar dari API)
      setFormNomorKamar(kamar.nomorKamar || "");
      setFormHarga(formatRibuan(kamar.hargaSewa?.toString() || "0"));
      setFormHargaRaw(kamar.hargaSewa || 0);
      setFormDeskripsi(kamar.deskripsi || ""); // deskripsi bukan deskirpsi
      setFormStatusKamar(kamar.statusKamar || "");
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setMessageResponse("Gagal mengambil data kamar");
      showSnackbar();
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk update data kamar
  const updateDataKamar = async () => {
    // Validasi input
    if (!formNomorKamar || !formHargaRaw || !formDeskripsi) {
      setMessageResponse("Semua field harus diisi!");
      showSnackbar();
      return;
    }

    try {
      setLoading(true);
      const data = {
        nomorKamar: formNomorKamar,
        hargaSewa: formHargaRaw,
        deskripsi: formDeskripsi, // Ubah dari deskirpsi ke deskripsi
        statusKamar: formStatusKamar,
      };

      const response = await axios.put(`${Strings.api_kamar}/${id}`, data);

      setMessageResponse(response.data.message);
      showSnackbar();

      // Kembali ke halaman list setelah 1.5 detik
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Error updating data:", error);
      setMessageResponse("Gagal mengupdate data kamar");
      showSnackbar();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "flex-start", width: "100%" }}>
        <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
          Edit Data Kamar
        </Text>

        {/* Area Nomor Kamar */}
        <TextInput
          label="Nomor Kamar"
          style={styles.text_input}
          maxLength={3}
          value={formNomorKamar}
          onChangeText={(text) => {
            const result = filterNomorKamar(text);
            setFormNomorKamar(result);
          }}
          disabled={loading}
          keyboardType="numeric"
        />

        {/* Area Harga Sewa */}
        <TextInput
          label="Harga Sewa"
          style={styles.text_input}
          maxLength={15}
          value={formHarga}
          onChangeText={(text) => {
            const result = formatRibuan(filterHarga(text));
            const resultRaw = filterHargaRaw(text);
            setFormHarga(result);
            setFormHargaRaw(Number(resultRaw));
          }}
          disabled={loading}
          keyboardType="numeric"
        />

        {/* Area Status Kamar */}
        <TextInput
          label="Status Kamar (Tersedia/Terisi)"
          style={styles.text_input}
          maxLength={20}
          value={formStatusKamar}
          onChangeText={(text) => setFormStatusKamar(text)}
          disabled={loading}
        />

        {/* Area Deskripsi */}
        <TextInput
          label="Deskripsi"
          style={styles.text_input}
          multiline
          numberOfLines={4}
          value={formDeskripsi}
          onChangeText={(text) => setFormDeskripsi(text)}
          disabled={loading}
        />

        {/* Tombol Simpan */}
        <Button
          mode="contained"
          onPress={updateDataKamar}
          disabled={loading}
          style={{
            marginTop: 20,
            backgroundColor: "#0046FF",
            paddingVertical: 8,
            marginRight: 20,
            marginLeft: 20,
          }}
          labelStyle={{ fontSize: 16, color: "#fff" }}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>

        {/* Tombol Batal */}
        <Button
          mode="outlined"
          onPress={() => router.replace("/kamar/page")}
          disabled={loading}
          style={{
            marginTop: 10,
            borderColor: "#0046FF",
            paddingVertical: 8,
            marginRight: 20,
            marginLeft: 20,
          }}
          labelStyle={{ fontSize: 16, color: "#0046FF" }}
        >
          Batal
        </Button>
      </View>

      {/* Area Snackbar */}
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={hideSnackbar}
        duration={3000}
        style={styles.snackbar}
      >
        {messageResponse}
      </Snackbar>
    </>
  );
}
