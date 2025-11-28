import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/dashboard";
import { Button, TextInput } from "react-native-paper";
import { router } from "expo-router";
import {
  filterHarga,
  filterHargaRaw,
  filterNomorKamar,
  formatRibuan,
} from "@/utils/script";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// testing dorpdown
const statusPembayaran = [
  { label: "Tersedia", value: "Tersedia" },
  { label: "Tersewa", value: "Tersewa" },
  { label: "TidakTersedia", value: "TidakTersedia" },
];
interface DropdownItem {
  label: string;
  value: number;
}

export default function AddKamarPage() {
  // buat state
  const [formKamar, setNomorKamar] = useState("");
  const [formDeskripsi, setDeskripsi] = useState("");

  const [formHarga, setFormHarga] = useState("");
  const [formHargaRaw, setFormHargaRaw] = useState(0);
  // bagian useState untuk satuan
  const [value, setValue] = useState(null);

  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles_dropdown.item}>
        <Text style={styles_dropdown.textItem}>{item.label}</Text>
        {item.value === value && (
          // <AntDesign
          //   style={styles.icon}
          //   color="black"
          //   name="Safety"
          //   size={20}
          // />
          <MaterialIcons
            name="search"
            style={styles_dropdown.icon}
            size={24}
            color="black"
          />
        )}
      </View>
    );
  };

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
        placeholder="Pilih Satuan"
        searchPlaceholder="Pilih..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          // <AntDesign
          //   style={styles_dropdown.icon}
          //   color="black"
          //   name="Safety"
          //   size={20}
          // />
          <MaterialIcons
            name="keyboard-arrow-down"
            style={styles_dropdown.icon}
            size={24}
            color="black"
          />
        )}
        renderItem={renderItem}
      />

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
          style={{
            marginTop: 20,
            backgroundColor: "#0046FF",
            paddingVertical: 8,
            marginRight: 20,
            marginLeft: 20,
          }}
          labelStyle={{ fontSize: 16, color: "#fff" }}
        >
          Simpan
        </Button>
        <Button
          icon="close"
          mode="outlined"
          onPress={() => router.push("/kamar/page")}
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
  );
}

const styles_dropdown = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 0,
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
