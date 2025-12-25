import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

export default function ResetPasswordPage() {
  const router = useRouter();
  const theme = useTheme();

  const params = useLocalSearchParams();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const otpCode = Array.isArray(params.otpCode)
    ? params.otpCode[0]
    : params.otpCode;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    console.log("=== DEBUG RESET PASSWORD PAGE ===");
    console.log("Email diterima:", email);
    console.log("OTP diterima:", otpCode);
    console.log("URL API:", Strings.api_auth_reset_password);
    console.log("=================================");

    if (!email || !otpCode) {
      Alert.alert(
        "Error Data",
        "Parameter Email atau OTP hilang. Silakan ulangi proses.",
        [
          {
            text: "Kembali ke Login",
            onPress: () => router.replace("/auth/login"),
          },
        ]
      );
    }
  }, [email, otpCode]);

  const handleResetPassword = async () => {
    console.log("Tombol Simpan Ditekan");

    if (!password || !confirmPassword) {
      Alert.alert("Peringatan", "Mohon isi password baru dan konfirmasi");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan konfirmasi tidak sama");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: email,
        otp: otpCode,
        newPassword: password,
      };

      console.log("Mengirim Payload ke Backend:", payload);

      const response = await api.post(Strings.api_auth_reset_password, payload);

      console.log("Respon Backend:", response.status, response.data);

      if (response.data.success || response.status === 200) {
        Alert.alert(
          "Sukses",
          "Password berhasil diubah. Silakan login kembali.",
          [
            {
              text: "Login",
              onPress: () => {
                router.dismissAll();
                router.replace("/auth/login");
              },
            },
          ]
        );
      } else {
        Alert.alert("Gagal", response.data.message || "Gagal mereset password");
      }
    } catch (error: any) {
      console.error("Error Axios:", error);
      const msg = error.response?.data?.message || "Terjadi kesalahan server";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Reset Password
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text variant="bodySmall" style={{ color: "#666" }}>
            Reset untuk: {email}
          </Text>
          <Text variant="bodySmall" style={{ color: "#666" }}>
            Kode OTP: {otpCode}
          </Text>
        </View>

        <TextInput
          label="Password Baru"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={secureText}
          right={
            <TextInput.Icon
              icon={secureText ? "eye" : "eye-off"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          style={styles.input}
        />

        <TextInput
          label="Konfirmasi Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry={secureText}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          style={styles.button}
        >
          Simpan Password Baru
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontWeight: "bold", marginBottom: 10 },
  input: { marginBottom: 20, backgroundColor: "#fff" },
  button: { borderRadius: 8, paddingVertical: 6 },
});
