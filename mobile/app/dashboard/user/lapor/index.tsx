import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, TextInput, Button, Card, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";

export default function LaporScreen() {
  const router = useRouter();
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = () => {
    // Logika pengiriman laporan akan ditaruh di sini nanti
    alert("Laporan berhasil dikirim!");
    router.back(); // Kembali ke dashboard setelah lapor
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>Lapor Kerusakan</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sampaikan keluhan atau kerusakan fasilitas kos Anda di sini.
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Apa yang ingin Anda laporkan?"
              placeholder="Contoh: Keran air bocor, lampu kamar mati..."
              mode="outlined"
              multiline
              numberOfLines={5}
              value={deskripsi}
              onChangeText={setDeskripsi}
              style={styles.input}
            />
            <HelperText type="info">
              Berikan deskripsi yang jelas agar petugas mudah memperbaikinya.
            </HelperText>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.button}
          disabled={!deskripsi}
        >
          Kirim Laporan
        </Button>
        
        <Button mode="text" onPress={() => router.back()}>
          Batal
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  title: { fontWeight: "bold", color: "#333" },
  subtitle: { marginBottom: 20, color: "#666" },
  card: { marginBottom: 20, backgroundColor: "white", borderRadius: 12 },
  input: { backgroundColor: "white" },
  button: { paddingVertical: 5, borderRadius: 8, marginBottom: 10 }
});