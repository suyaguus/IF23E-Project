import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Avatar,
  useTheme,
  Divider,
  Portal,
  Dialog,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Strings } from "@/constants/strings";
import { useRouter, Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function EditProfilePage() {
  const { userData, setUserData } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  // State Form Biodata
  const [username, setUsername] = useState(userData?.username || "");
  const [phone, setPhone] = useState(userData?.notelp || "");
  const [loadingSave, setLoadingSave] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // State Password Dialog
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const [secureText, setSecureText] = useState({
    current: true,
    new: true,
    confirm: true,
  });

  const showNotification = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, [{ text: "OK" }]);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showNotification(
        "Izin Ditolak",
        "Maaf, kami butuh izin galeri untuk mengganti foto."
      );
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
    setUploadingImage(true);
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

      const response = await api.patch(
        `${Strings.api_user}/${userData?.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setUserData({ ...userData!, imageUrl: response.data.data.imageUrl });
        showNotification("Sukses", "Foto profil berhasil diperbarui!");
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      showNotification("Gagal", "Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    Keyboard.dismiss();
    setLoadingSave(true);
    try {
      const payload = {
        username: username,
        notelp: phone,
      };

      console.log("Mengirim PUT ke:", `${Strings.api_user}/${userData?.id}`);
      
      const response = await api.put(`${Strings.api_user}/${userData?.id}`, payload); 

      if (response.data.success) {
        setUserData({ ...userData!, username: username, notelp: phone });
        showNotification("Sukses", "Profil berhasil disimpan!");
      } else {
        showNotification("Gagal", response.data.message || "Gagal menyimpan data.");
      }
    } catch (error: any) {
      console.error("Save Profile Error:", error);
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan server.";
      showNotification("Error", errorMsg);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleChangePassword = async () => {
    Keyboard.dismiss();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showNotification("Validasi", "Mohon isi semua kolom password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showNotification("Validasi", "Password baru dan konfirmasi tidak cocok.");
      return;
    }
    setLoadingPass(true);
    try {
      const payload = {
        userId: userData?.id,
        currentPassword,
        newPassword,
      };

      const response = await api.post(
        Strings.api_auth_change_password,
        payload
      );

      if (response.data.success) {
        setVisibleDialog(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        showNotification("Sukses", "Password berhasil diubah!");
      } else {
        showNotification("Gagal", response.data.message);
      }
    } catch (error: any) {
      showNotification(
        "Error",
        error.response?.data?.message || "Gagal mengubah password."
      );
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Stack.Screen options={{ title: "Edit Profil", headerShown: true }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Foto Profil */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePickImage} disabled={uploadingImage}>
            <View>
              {userData?.imageUrl ? (
                <Avatar.Image size={100} source={{ uri: userData.imageUrl }} />
              ) : (
                <Avatar.Text
                  size={100}
                  label={username.substring(0, 2).toUpperCase()}
                />
              )}
              <View
                style={[
                  styles.cameraBadge,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                {uploadingImage ? (
                  <ActivityIndicator size={16} color="white" />
                ) : (
                  <Avatar.Icon
                    size={24}
                    icon="camera"
                    color="white"
                    style={{ backgroundColor: "transparent" }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, color: "#666" }}>
            Ketuk foto untuk mengubah
          </Text>
        </View>

        {/* Form Input */}
        <View style={styles.content}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
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
            label="Email (Tidak dapat diubah)"
            value={userData?.email}
            mode="outlined"
            disabled
            style={[styles.input, { backgroundColor: "#f0f0f0" }]}
            left={<TextInput.Icon icon="email" />}
          />

          <Button
            mode="contained"
            onPress={handleSaveProfile}
            loading={loadingSave}
            style={styles.saveButton}
          >
            Simpan Perubahan
          </Button>

          <Divider style={{ marginVertical: 20 }} />

          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={{ borderColor: theme.colors.error }}
            onPress={() => setVisibleDialog(true)}
          >
            Ganti Password
          </Button>

          <Divider style={{ marginVertical: 20 }} />

          <Button mode="outlined" onPress={() => router.replace("/dashboard/admin/profile")}>
            Kembali
          </Button>
        </View>
      </ScrollView>

      {/* Dialog Password */}
      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={() => setVisibleDialog(false)}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Title style={{ textAlign: "center" }}>
            Ganti Password
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Password Lama"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              secureTextEntry={secureText.current}
              style={styles.dialogInput}
              right={
                <TextInput.Icon
                  icon={secureText.current ? "eye" : "eye-off"}
                  onPress={() =>
                    setSecureText({
                      ...secureText,
                      current: !secureText.current,
                    })
                  }
                />
              }
            />
            <TextInput
              label="Password Baru"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry={secureText.new}
              style={styles.dialogInput}
              right={
                <TextInput.Icon
                  icon={secureText.new ? "eye" : "eye-off"}
                  onPress={() =>
                    setSecureText({ ...secureText, new: !secureText.new })
                  }
                />
              }
            />
            <TextInput
              label="Konfirmasi Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              mode="outlined"
              secureTextEntry={secureText.confirm}
              style={styles.dialogInput}
              right={
                <TextInput.Icon
                  icon={secureText.confirm ? "eye" : "eye-off"}
                  onPress={() =>
                    setSecureText({
                      ...secureText,
                      confirm: !secureText.confirm,
                    })
                  }
                />
              }
            />
            <HelperText type="info">Minimal 6 karakter.</HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Batal</Button>
            <Button onPress={handleChangePassword} loading={loadingPass}>
              Simpan
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: "center", paddingVertical: 20 },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  content: { padding: 20 },
  input: { marginBottom: 15, backgroundColor: "white" },
  saveButton: { marginTop: 10, paddingVertical: 5 },
  dialogInput: { marginBottom: 10, backgroundColor: "white" },
});
