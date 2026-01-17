import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();

  // 1. Kita rename isLoading jadi authLoading agar tidak bentrok
  const { login, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // 2. TAMBAHKAN INI: State untuk loading lokal (UI)
  const [localLoading, setLocalLoading] = useState(false);

  // Snackbar State
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const isLoading = authLoading || localLoading;

  const handleLogin = async () => {
    Keyboard.dismiss();
    setVisibleSnack(false);
    setIsError(false);

    if (!email || !password) {
      setSnackMessage("Mohon isi email dan password");
      setIsError(true);
      setVisibleSnack(true);
      return;
    }

    setLocalLoading(true);

    try {
      console.log("Attempting Login...");
      const user = await login(email, password);

      console.log("Login Success, preparing redirect...");

      // Redirect HANYA jika tidak error
      setTimeout(() => {
        setLocalLoading(false);
        const role = user?.role?.toLowerCase() || "user";
        if (role === "admin") router.replace("/dashboard/admin");
        else router.replace("/dashboard/user");
      }, 100);
    } catch (error: any) {
      // JIKA MASUK SINI, HALAMAN TIDAK BOLEH PINDAH
      setLocalLoading(false);
      console.log("Catch Block Triggered:", error.message);

      const msg =
        error.response?.data?.message || error.message || "Gagal Login";

      setSnackMessage(msg);
      setIsError(true);
      setVisibleSnack(true); // Tampilkan Snackbar
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Wisma Dempo
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Silakan login untuk melanjutkan
          </Text>
        </View>

        {/* Input sekarang menggunakan variabel isLoading yang sudah didefinisikan */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" color={theme.colors.secondary} />}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          disabled={isLoading}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          left={<TextInput.Icon icon="lock" color={theme.colors.secondary} />}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye" : "eye-off"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          secureTextEntry={secureTextEntry}
          style={styles.input}
          disabled={isLoading}
        />

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => router.push("/auth/forgot-password")}
            disabled={isLoading}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>
              Lupa Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.primaryButton}
            contentStyle={{ height: 48 }}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>

          <View style={styles.registerContainer}>
            <Text style={{ color: "#666" }}>Belum punya akun? </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth/signup")}
              disabled={isLoading}
            >
              <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
                Daftar Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Snackbar
        visible={visibleSnack}
        onDismiss={() => setVisibleSnack(false)}
        duration={4000}
        style={{
          backgroundColor: isError ? theme.colors.error : theme.colors.primary,
          borderRadius: 8,
          marginBottom: 20,
        }}
        action={{
          label: "Tutup",
          onPress: () => setVisibleSnack(false),
          textColor: "white",
        }}
      >
        {snackMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  headerContainer: { marginBottom: 30, alignItems: "center" },
  title: { fontWeight: "bold", marginBottom: 5 },
  subtitle: { color: "#666" },
  input: { marginBottom: 16, backgroundColor: "#fff" },
  forgotPasswordContainer: { alignItems: "flex-end", marginBottom: 24 },
  buttonGroup: { marginTop: 10 },
  primaryButton: { borderRadius: 10, justifyContent: "center" },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
