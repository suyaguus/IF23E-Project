import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/dashboard";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { router } from "expo-router";
import {
  filterHarga,
  filterHargaRaw,
  filterNomorKamar,
  formatRibuan,
} from "@/utils/script";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { Strings } from "@/constants/strings";

// Data dropdown
const statusKamar = [
  { label: "Tersedia", value: "Tersedia" },
  { label: "Tersewa", value: "Tersewa" },
  { label: "Tidak Tersedia", value: "TidakTersedia" },
];

interface DropdownItem {
  label: string;
  value: string;
}

export default function AddKamarPage() {
  // State untuk form
  const [formNomorKamar, setFormNomorKamar] = useState("");
  const [formDeskripsi, setFormDeskripsi] = useState("");
  const [formHarga, setFormHarga] = useState("");
  const [formHargaRaw, setFormHargaRaw] = useState(0);
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

  // Fungsi untuk menyimpan data kamar
  const saveDataKamar = async () => {
    // Validasi input
    if (!formNomorKamar) {
      setMessageResponse("Nomor kamar harus diisi!");
      showSnackbar();
      return;
    }

    if (!formHargaRaw || formHargaRaw === 0) {
      setMessageResponse("Harga sewa harus diisi!");
      showSnackbar();
      return;
    }

    if (!formStatusKamar) {
      setMessageResponse("Status kamar harus dipilih!");
      showSnackbar();
      return;
    }

    if (!formDeskripsi) {
      setMessageResponse("Deskripsi harus diisi!");
      showSnackbar();
      return;
    }

    try {
      setLoading(true);

      const data = {
        nomorKamar: formNomorKamar,
        hargaSewa: formHargaRaw,
        statusKamar: formStatusKamar,
        deskripsi: formDeskripsi,
      };

      console.log("Sending data:", data);

      const response = await axios.post(Strings.api_kamar, data);

      console.log("Response:", response.data);

      // Cek response success dari API
      if (response.data.success) {
        setMessageResponse(response.data.message);
        showSnackbar();

        // Reset form setelah berhasil
        setFormNomorKamar("");
        setFormHarga("");
        setFormHargaRaw(0);
        setFormStatusKamar("");
        setFormDeskripsi("");

        // Kembali ke halaman list setelah 1.5 detik
        setTimeout(() => {
          router.replace("/kamar/page");
        }, 1500);
      } else {
        // Handle jika success false (misal nomor kamar sudah ada)
        setMessageResponse(response.data.message);
        showSnackbar();
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      console.error("Error response:", error.response?.data);

      // Tampilkan pesan error dari API atau error umum
      const errorMessage =
        error.response?.data?.message ||
        "Gagal menambahkan kamar: " + error.message;
      setMessageResponse(errorMessage);
      showSnackbar();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
          Tambah Data Kamar
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
          data={statusKamar}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih Status Kamar"
          searchPlaceholder="Cari..."
          value={formStatusKamar}
          onChange={(item) => {
            console.log("Status dipilih:", item.value);
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
          maxLength={255}
          multiline
          numberOfLines={4}
          value={formDeskripsi}
          onChangeText={(text) => setFormDeskripsi(text)}
          disabled={loading}
        />

        {/* Area Tombol */}
        <View style={{ justifyContent: "flex-end", marginTop: 10, gap: 10 }}>
          <Button
            icon="check"
            mode="contained"
            onPress={saveDataKamar}
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
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>

          <Button
            icon="close"
            mode="outlined"
            onPress={() => router.replace("/kamar/page")}
            disabled={loading}
            style={{
              marginTop: 5,
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
    </ScrollView>
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
