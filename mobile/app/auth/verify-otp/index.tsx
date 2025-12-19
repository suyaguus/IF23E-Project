import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

export default function VerifyOtpPage() {
  const router = useRouter();
  const theme = useTheme();

  const params = useLocalSearchParams();

  const emailRaw = Array.isArray(params.email) ? params.email[0] : params.email;
  const email = emailRaw ? decodeURIComponent(emailRaw) : "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("=== DEBUG VERIFY PAGE ===");
    console.log("Params diterima:", params);
    console.log("Email final:", email);
    console.log("=========================");

    if (!email) {
      Alert.alert(
        "Data Hilang",
        "Parameter email tidak ditemukan. Mohon ulangi proses."
      );
    }
  }, [email]);

  const handleVerify = async () => {
    if (!otp) {
      Alert.alert("Peringatan", "Masukkan kode OTP");
      return;
    }

    setLoading(true);
    try {
      console.log("Mengirim OTP ke Backend:", otp);

      const response = await api.post(Strings.api_auth_verify_otp, {
        email: email,
        otp: otp,
      });

      console.log("Status Backend:", response.status); 

      if (response.data.success || response.status === 200) {
        setLoading(false); 
        console.log("OTP Valid! Pindah ke Reset Password...");

        router.push({
          pathname: "/auth/reset-password",
          params: {
            email: email,
            otpCode: otp,
          },
        } as any);
      } else {
        setLoading(false);
        Alert.alert("Gagal", response.data.message || "Kode OTP Salah");
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error Verify:", error);
      const msg = error.response?.data?.message || "Verifikasi Gagal";
      Alert.alert("Error", msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Verifikasi OTP
        </Text>

        {/* 3. VISUAL CHECK DI UI */}
        <View
          style={{
            marginBottom: 20,
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          <Text variant="bodySmall" style={{ color: "#666" }}>
            Mengirim kode untuk:
          </Text>
          <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
            {email ? email : "EMAIL HILANG / UNDEFINED"}
          </Text>
        </View>

        <TextInput
          label="Kode OTP"
          value={otp}
          onChangeText={setOtp}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
          maxLength={6}
        />
        <Button
          mode="contained"
          onPress={handleVerify}
          loading={loading}
          style={styles.button}
        >
          Verifikasi
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
