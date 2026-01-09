import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  Avatar,
  Card,
  Text,
  List,
  Divider,
  useTheme,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import api from "@/services/api";

export default function AdminProfilePage() {
  const { userData, setUserData, logout } = useAuth();
  const theme = useTheme();
  const [uploading, setUploading] = useState(false);

  // Fungsi Inisial (Fallback jika tidak ada gambar)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Maaf, kami butuh izin galeri untuk mengganti foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    }
  };

  const uploadFile = async (uri: string) => {
    setUploading(true);
    try {
      const formData = new FormData();
      const filename = uri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      // @ts-ignore
      formData.append("image", {
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        name: filename,
        type,
      });

      const response = await api.patch(`/user/${userData?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setUserData({ ...userData!, imageUrl: response.data.data.imageUrl });
        if (Platform.OS === "web") alert("Foto profil berhasil diperbarui");
        else Alert.alert("Sukses", "Foto profil berhasil diperbarui");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Gagal mengunggah gambar";
      if (Platform.OS === "web") alert(errMsg);
      else Alert.alert("Gagal", errMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header Profile dengan Unggah Foto */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          onPress={handlePickImage}
          disabled={uploading}
          style={styles.avatarWrapper}
        >
          <View style={styles.avatarContainer}>
            {userData?.imageUrl ? (
              <Avatar.Image
                size={110}
                source={{ uri: userData.imageUrl }}
                style={{ backgroundColor: "white" }}
              />
            ) : (
              <Avatar.Text
                size={110}
                label={getInitials(userData?.username || "Admin")}
                style={{ backgroundColor: "white" }}
                color={theme.colors.primary}
                labelStyle={{ fontWeight: "bold", fontSize: 36 }}
              />
            )}

            {/* Badge Icon Kamera */}
            <View
              style={[
                styles.cameraBadge,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
            >
              {uploading ? (
                <ActivityIndicator size={16} color={theme.colors.primary} />
              ) : (
                <Avatar.Icon
                  size={28}
                  icon="camera"
                  color="white"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <Text variant="headlineSmall" style={styles.name}>
          {userData?.username || "Nama Pengguna"}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          {userData?.role || "Admin"}
        </Text>
      </View>

      {/* Detail Informasi */}
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Informasi Pribadi
            </Text>

            <List.Item
              title="Email"
              description={userData?.email}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="email"
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />

            <List.Item
              title="Nomor Telepon"
              description={userData?.notelp || "Belum diatur"}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="phone"
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider />

            <List.Item
              title="Bergabung Sejak"
              description={
                userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("id-ID")
                  : new Date().toLocaleDateString("id-ID")
              }
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="calendar"
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          icon="account-edit"
          style={{ marginTop: 20, borderColor: theme.colors.primary }}
          onPress={() => alert("Fitur Edit Data akan datang segera!")}
        >
          Edit Biodata
        </Button>

        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          icon="logout"
          style={{ marginTop: 12 }}
          onPress={logout}
        >
          Keluar Aplikasi
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 50,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginBottom: 20,
  },
  avatarWrapper: {
    marginBottom: 15,
  },
  avatarContainer: {
    position: "relative",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 60,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    overflow: "hidden",
  },
  name: { color: "white", fontWeight: "bold", marginTop: 5 },
  role: { color: "#E6F2FF", marginTop: 5, textTransform: "capitalize" },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: "white", elevation: 3, borderRadius: 16 },
  cardTitle: { marginBottom: 10, fontWeight: "bold" },
});
