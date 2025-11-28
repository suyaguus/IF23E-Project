import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Strings } from "@/constants/strings";
import { styles } from "@/styles/dashboard";
import { filterHarga, filterHargaRaw, formatRibuan } from "@/utils/script";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";

// Data dropdown
const statusPembayaran = [
  { label: "Tersedia", value: "Tersedia" },
  { label: "Tersewa", value: "Tersewa" },
  { label: "Tidak Tersedia", value: "TidakTersedia" },
];

// Interface yang benar
interface DropdownItem {
  label: string;
  value: string;
}

export default function DetailKamarPage() {
  // Ambil ID dari parameter URL dan konversi ke string
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  // Debug log
  console.log("Raw params:", params);
  console.log("ID:", id, "Type:", typeof id);

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

  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles_dropdown.item}>
        <Text style={styles_dropdown.textItem}>{item.label}</Text>
        {item.value === formStatusKamar && (
          <MaterialIcons
            name="check"
            style={styles_dropdown.icon}
            size={24}
            color="#0046FF"
          />
        )}
      </View>
    );
  };

  // Fungsi untuk filter nomor kamar (hanya angka dan huruf)
  const filterNomorKamar = (text: string) => {
    return text.replace(/[^A-Za-z0-9]/g, "");
  };

  // Fungsi untuk mengambil data kamar berdasarkan ID
  const getDataKamar = useCallback(async () => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching:", `${Strings.api_kamar}/${id}`);
      
      const response = await axios.get(`${Strings.api_kamar}/${id}`);
      console.log("API Response:", response.data);

      const kamar = response.data.data;

      if (!kamar) {
        throw new Error("Data kamar tidak ditemukan");
      }

      console.log("Kamar data:", kamar);

      // Set data ke form
      setFormNomorKamar(kamar.nomorKamar || "");
      setFormHarga(formatRibuan(kamar.hargaSewa?.toString() || "0"));
      setFormHargaRaw(kamar.hargaSewa || 0);
      setFormDeskripsi(kamar.deskripsi || "");
      setFormStatusKamar(kamar.statusKamar || "");
      
      console.log("Form states set successfully");
    } catch (error: any) {
      console.error("Error fetching data:", error);
      console.error("Error response:", error.response?.data);
      setMessageResponse("Gagal mengambil data kamar: " + (error.response?.data?.message || error.message));
      showSnackbar();
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Ambil data kamar saat halaman dimuat
  useEffect(() => {
    if (id) {
      console.log("Loading data for ID:", id);
      getDataKamar();
    }
  }, [id, getDataKamar]);

  // Fungsi untuk update data kamar
  const updateDataKamar = async () => {
    if (!id) {
      setMessageResponse("ID tidak valid");
      showSnackbar();
      return;
    }

    // Validasi input
    if (!formNomorKamar || !formHargaRaw || !formDeskripsi || !formStatusKamar) {
      setMessageResponse("Semua field harus diisi!");
      showSnackbar();
      return;
    }

    try {
      setLoading(true);
      const data = {
        nomorKamar: formNomorKamar,
        hargaSewa: formHargaRaw,
        deskripsi: formDeskripsi,
        statusKamar: formStatusKamar,
      };

      console.log("Updating ID:", id);
      console.log("Sending data:", data);

      const response = await axios.put(`${Strings.api_kamar}/${id}`, data);

      setMessageResponse(response.data.message);
      showSnackbar();

      // Kembali ke halaman list setelah 1.5 detik
      setTimeout(() => {
        router.replace("/kamar/page");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating data:", error);
      console.error("Error response:", error.response?.data);
      setMessageResponse("Gagal mengupdate data kamar: " + (error.response?.data?.message || error.message));
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
          maxLength={10}
          value={formNomorKamar}
          onChangeText={(text) => {
            const result = filterNomorKamar(text);
            setFormNomorKamar(result);
          }}
          disabled={loading}
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
        <Dropdown
          style={styles_dropdown.dropdown}
          placeholderStyle={styles_dropdown.placeholderStyle}
          selectedTextStyle={styles_dropdown.selectedTextStyle}
          inputSearchStyle={styles_dropdown.inputSearchStyle}
          iconStyle={styles_dropdown.iconStyle}
          data={statusPembayaran}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih Status Kamar"
          searchPlaceholder="Cari..."
          value={formStatusKamar}
          onChange={(item) => {
            console.log("Dropdown changed:", item.value);
            setFormStatusKamar(item.value);
          }}
          renderLeftIcon={() => (
            <MaterialIcons
              name="keyboard-arrow-down"
              style={styles_dropdown.icon}
              size={24}
              color="black"
            />
          )}
          renderItem={renderItem}
          disable={loading}
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

const styles_dropdown = StyleSheet.create({
  dropdown: {
    margin: 20,
    height: 50,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});