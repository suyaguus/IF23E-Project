import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();

  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Peringatan", "Mohon isi email dan password");
      return;
    }
    try {
      const user = await login(email, password);

      if (!user || !user.role) {
        throw new Error("Login berhasil tapi data role tidak ditemukan.");
      }

      const role = user.role.toLowerCase().trim();

      setTimeout(() => {
        if (role === "admin") {
          router.replace("/dashboard/admin");
        } else {
          router.replace("/dashboard/user");
        }
      }, 100);
    } catch (error: any) {
      Alert.alert("Login Gagal", error.message || "Terjadi kesalahan sistem");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Selamat Datang
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Masuk untuk mengelola kos Anda
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
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

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => router.push("/auth/forgot-password")}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
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
            contentStyle={{ paddingVertical: 6 }}
          >
            Masuk
          </Button>

          <Button
            mode="outlined"
            onPress={() => router.push("/dashboard")}
            disabled={isLoading}
            style={styles.secondaryButton}
          >
            Kembali
          </Button>
        </View>

        <View style={styles.registerContainer}>
          <Text>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
              Daftar Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 32 },
  input: { marginBottom: 16, backgroundColor: "#fff" },

  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },

  button: { borderRadius: 8 },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  buttonGroup: {
    marginTop: 8,
  },
  primaryButton: {
    borderRadius: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
});
