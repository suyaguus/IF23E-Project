import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/dashboard"; // import styles dari file styles/barang.ts
import { Button, TextInput } from "react-native-paper";
import { router } from "expo-router";
import {
  filterHarga,
  filterHargaRaw,
  filterNomorKamar,
  formatRibuan,
} from "@/utils/script";

// testing dorpdown
const statusPembayaran = [
  { label: "Tersedia", value: "Tersedia" },
  { label: "Tersewa", value: "Tersewa" },
  { label: "TidakTersedia", value: "TidakTersedia" },
];

export default function AddKamarPage() {
  // buat state
  const [formKamar, setNomorKamar] = useState("");
  const [formDeskripsi, setDeskripsi] = useState("");

  const [formHarga, setFormHarga] = useState("");
  const [formHargaRaw, setFormHargaRaw] = useState(0);

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
        value={formKamar}
        onChangeText={(text) => {
          const result = filterNomorKamar(text);
          setNomorKamar(result);
        }}
      />

      {/* area harga sewa */}
      <TextInput
        id="txt_harga"
        label="Harga Sewa"
        style={styles.text_input}
        maxLength={10}
        value={formHarga} // Ganti dari formHargaSewa ke formHarga
        onChangeText={(text) => {
          const result = formatRibuan(filterHarga(text));
          const resultRaw = filterHargaRaw(text);
          setFormHarga(result);
          setFormHargaRaw(Number(resultRaw));
        }}
      />

      {/* area status kamar */}

      {/* area deskripsi */}
      <TextInput
        label="Deskirpsi"
        style={styles.text_input}
        maxLength={255}
        value={formDeskripsi}
        onChangeText={(text) => setDeskripsi(text)}
      />
      {/* area tombol */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
          gap: 10,
        }}
      >
        <Button
          icon="check"
          mode="contained"
          //   testing regex harga
          onPress={() =>
            console.log(
              `${formKamar}, ${formDeskripsi}, ${formHarga}, ${formHargaRaw}`
            )
          }
        >
          Simpan
        </Button>
        <Button
          icon="close"
          mode="outlined"
          onPress={() => router.push("/kamar/page")}
          style={{ marginRight: 10 }}
        >
          Batal
        </Button>
      </View>
    </View>
  );
}
