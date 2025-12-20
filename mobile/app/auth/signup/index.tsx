import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

export default function RegisterPage() {
  const router = useRouter();
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  // buat state snacbar
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showSnackbar = (message: string, isErr: boolean = false) => {
    setSnackbarMessage(message);
    setIsError(isErr);
    setVisible(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  const handleRegister = async () => {
    console.log("--- TOMBOL DAFTAR DITEKAN ---");
    Keyboard.dismiss();

    // Validasi input
    if (!name || !email || !phone || !password) {
      showSnackbar("Mohon lengkapi semua data.", true);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: name,
        email: email,
        notelp: phone,
        password: password,
        role: "User",
      };

      console.log("Mengirim Payload:", payload);

      const responseRaw = await api.post(Strings.api_auth_register, payload);
      const response = responseRaw as any;

      console.log("Respon API:", response);

      // Cek Sukses
      const isSuccess =
        response.status === 201 ||
        response.status === 200 ||
        response.data?.success === true ||
        response.success === true;

      if (isSuccess) {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setLoading(false);

        showSnackbar("Akun berhasil dibuat! Mengalihkan...", false);

        setTimeout(() => {
          router.replace("/auth/login");
        }, 1500);
      } else {
        setLoading(false);
        const errorMsg =
          response.data?.message || response.message || "Gagal mendaftar.";
        showSnackbar(errorMsg, true);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Register Error:", error);

      let msg = "Terjadi kesalahan koneksi";
      if (error.response) {
        msg = error.response.data?.message || msg;
      } else if (error.message) {
        msg = error.message;
      }

      showSnackbar(msg, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Buat Akun Baru
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Lengkapi data diri Anda
          </Text>

          <TextInput
            label="Nama Lengkap"
            value={name}
            onChangeText={setName}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
          />

          <TextInput
            label="Nomor Telepon"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            secureTextEntry={secureTextEntry}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={{ paddingVertical: 5 }}
          >
            Daftar
          </Button>

          <Button
            mode="text"
            onPress={() => router.replace("/auth/login")}
            style={{ marginTop: 10 }}
          >
            Sudah punya akun? Login
          </Button>
        </ScrollView>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={{
            backgroundColor: isError ? theme.colors.error : "#4CAF50",
            marginBottom: 20,
          }}
          action={{
            label: "Tutup",
            onPress: () => {
              setVisible(false);
            },
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 24, flexGrow: 1, justifyContent: "center" },
  title: { fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 32 },
  input: { marginBottom: 16, backgroundColor: "#fff" },
  button: { borderRadius: 8, marginTop: 8 },
});
