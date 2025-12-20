import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Avatar,
  useTheme,
  Divider,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

export default function UserProfile() {
  const { userData, logout } = useAuth();
  const theme = useTheme();

  const [name, setName] = useState(userData?.username || "");
  const [phone, setPhone] = useState(userData?.notelp || "");

  const handleSave = () => {
    Alert.alert("Sukses", "Data profil berhasil disimpan (Simulasi)");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Avatar.Icon
          size={80}
          icon="account"
          style={{ backgroundColor: "white" }}
          color={theme.colors.primary}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {userData?.username || "Nama Pengguna"}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {userData?.email || "email@example.com"}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          variant="titleMedium"
          style={{ marginBottom: 15, fontWeight: "bold" }}
        >
          Edit Profil
        </Text>

        <TextInput
          label="Username"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Nomor Telepon"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
          left={<TextInput.Icon icon="phone" />}
        />

        <TextInput
          label="Email"
          value={userData?.email || ""}
          mode="outlined"
          style={styles.input}
          disabled={true}
          left={<TextInput.Icon icon="email" />}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          style={{ marginTop: 10, borderRadius: 8 }}
        >
          Simpan Perubahan
        </Button>

        <Divider style={{ marginVertical: 20 }} />

        <Button
          mode="outlined"
          textColor={theme.colors.error}
          style={{ borderColor: theme.colors.error }}
          onPress={() =>
            Alert.alert("Info", "Fitur ubah password akan datang segera.")
          }
        >
          Ubah Password
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  name: { color: "white", fontWeight: "bold", marginTop: 10 },
  email: { color: "#E6F2FF", marginTop: 5 },
  content: { padding: 20 },
  input: { marginBottom: 15, backgroundColor: "white" },
});
