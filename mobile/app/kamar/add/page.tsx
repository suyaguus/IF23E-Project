import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/dashboard"; // import styles dari file styles/barang.ts
import { TextInput } from "react-native-paper";

// testing dorpdown
const statusPembayaran = [
  { label: "Tersedia", value: "Tersedia" },
  { label: "Tersewa", value: "Tersewa" },
  { label: "TidakTersedia", value: "TidakTersedia" },
];

export default function KamarPage() {
  // buat state
  const [textNomorKamar, setNomorKamar] = useState("");
  const [textHargaSewa, setHargaSewa] = useState("");
  const [textDeskripsi, setDeskripsi] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
      }}
    >
      <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        Data Kamar
      </Text>

      {/* area nomor kamar */}
      <TextInput
        label="Nomor Kamar..."
        style={styles.text_input}
        maxLength={3}
        value={textNomorKamar}
        onChangeText={(text) => setNomorKamar(text)}
      />

      {/* area harga sewa */}
      <TextInput
        label="Harga Sewa..."
        style={styles.text_input}
        maxLength={10}
        value={textHargaSewa}
        onChangeText={(text) => setHargaSewa(text)}
      />

      {/* area status kamar */}

      {/* area deskripsi */}
      <TextInput
        label="Deskirpsi"
        style={styles.text_input}
        maxLength={255}
        value={textDeskripsi}
        onChangeText={(text) => setDeskripsi(text)}
      />
      {/* area tombol */}
    </View>
  );
}
