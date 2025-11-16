import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";

export default function UserViewPage() {

    // State untuk data
    const [data, setData] = useState<
        { id: number; username: string; email: string; role: string; password: string; createdAt: Date; updatedAt: Date; orders: number; riwayat_pembayaran: number }[]
    >([]);

  // State untuk Pencarian
  const [search, setSearch] = useState("");

  // State untuk loading
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", width: "100%" }}>
      {/* Area Header */}
      <Text style={[styles.warna_bg, { textAlign: "center" }]}>
        Halaman View User
      </Text>

      {/* Area Search */}
      <TextInput
        label="Cari Data Barang"
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="search"
                size={24}
                color="black"
                onPress={() => console.log("Pressed")}
              />
            )}
          />
        }
        style={{ fontSize: 16, backgroundColor: "#fff" }}
        value={search}
        onChangeText={(text) => setSearch(text)}
        editable={!loading}
      />

      {/* Area Content */}

      {/* Area FAB */}
    </View>
  );
}

// bagian style

const size = 20;
const styles = StyleSheet.create({
  warna_bg: {
    backgroundColor: "black",
    color: "#fff",
    fontSize: size,
  },
});
