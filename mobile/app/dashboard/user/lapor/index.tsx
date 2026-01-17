import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Text, TextInput, Button, Card, HelperText, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function LaporScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Fungsi mengambil gambar dari galeri
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Logika pengiriman laporan (ke API/Database)
    console.log("Laporan:", deskripsi, "Gambar:", image);
    alert("Laporan berhasil dikirim!");
    router.back(); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Custom */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buat Laporan</Text>
      </View>

      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>Lapor Kerusakan</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sampaikan keluhan atau kerusakan fasilitas kos Anda di sini.
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Deskripsi Kerusakan"
              placeholder="Contoh: Keran air bocor di kamar mandi..."
              mode="outlined"
              multiline
              numberOfLines={5}
              value={deskripsi}
              onChangeText={setDeskripsi}
              style={styles.input}
            />
            <HelperText type="info">
              Berikan deskripsi jelas agar petugas mudah memperbaikinya.
            </HelperText>

            {/* Bagian Upload Foto */}
            <Text style={styles.label}>Foto Bukti (Opsional)</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <MaterialIcons name="camera-alt" size={40} color="#ccc" />
                  <Text style={{ color: '#999' }}>Tambah Foto</Text>
                </View>
              )}
            </TouchableOpacity>
            {image && (
              <Button onPress={() => setImage(null)} textColor="red">Hapus Foto</Button>
            )}
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
        
        <Button mode="text" onPress={() => router.back()} textColor="#666">
          Batal
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  content: { padding: 20 },
  title: { fontWeight: "bold", color: "#333" },
  subtitle: { marginBottom: 20, color: "#666" },
  card: { marginBottom: 20, backgroundColor: "white", borderRadius: 12, elevation: 3 },
  input: { backgroundColor: "white", marginBottom: 10 },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  uploadBox: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fafafa'
  },
  previewImage: { width: '100%', height: '100%' },
  button: { paddingVertical: 5, borderRadius: 8, marginBottom: 10 }
});