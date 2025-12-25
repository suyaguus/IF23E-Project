import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert("Peringatan", "Mohon isi alamat email Anda");
      return;
    }

    setLoading(true);
    try {
      console.log("Mengirim request ke:", Strings.api_auth_forgot_password);

      const response = await api.post(Strings.api_auth_forgot_password, {
        email: email,
      });

      console.log("Respon Backend:", response.status, response.data);

      if (response.data.success || response.status === 200) {
        setLoading(false);

        console.log("Navigasi langsung dijalankan...");

        router.push({
          pathname: "/auth/verify-otp",
          params: { email: email },
        } as any);
      } else {
        Alert.alert("Gagal", response.data.message || "Gagal mengirim OTP.");
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error Send OTP:", error);
      Alert.alert("Error", "Gagal terhubung ke server");
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
          Lupa Password
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
        <Button
          mode="contained"
          onPress={handleSendOTP}
          loading={loading}
          style={styles.button}
        >
          Kirim OTP
        </Button>
        <Button
          mode="text"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          Kembali
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
