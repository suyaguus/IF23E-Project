import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Keyboard } from "react-native";
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
  Snackbar,
} from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Strings } from "@/constants/strings";

export default function UserProfile() {
  const { userData } = useAuth();
  const theme = useTheme();

  const [name, setName] = useState(userData?.username || "");
  const [phone, setPhone] = useState(userData?.notelp || "");

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

  const [visibleSb, setVisibleSb] = useState(false);
  const [messageSb, setMessageSb] = useState("");
  const [isErrorSb, setIsErrorSb] = useState(false);

  const showSnackbar = (msg: string, isError: boolean = false) => {
    setMessageSb(msg);
    setIsErrorSb(isError);
    setVisibleSb(true);
  };
  const onDismissSnackBar = () => setVisibleSb(false);

  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => {
    setVisibleDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleChangePassword = async () => {
    Keyboard.dismiss();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showSnackbar("Mohon isi semua kolom password.", true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showSnackbar("Password baru dan konfirmasi tidak cocok.", true);
      return;
    }

    if (newPassword.length < 6) {
      showSnackbar("Password baru minimal 6 karakter.", true);
      return;
    }

    setLoadingPass(true);

    try {
      const payload = {
        userId: userData?.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      const response = await api.post(
        Strings.api_auth_change_password,
        payload
      );

      if (response.data.success || response.status === 200) {
        setLoadingPass(false);
        hideDialog();

        setTimeout(() => {
          showSnackbar("Password berhasil diubah!", false);
        }, 400);
      } else {
        showSnackbar(response.data.message || "Gagal mengubah password.", true);
      }
    } catch (error: any) {
      console.error("Change Password Error:", error);
      const msg = error.response?.data?.message || "Terjadi kesalahan server";
      showSnackbar(msg, true);
    } finally {
      setLoadingPass(false);
    }
  };

  const handleSaveProfile = () => {
    Alert.alert("Info", "Fitur simpan profil belum tersedia.");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView>
        <View
          style={[styles.header, { backgroundColor: theme.colors.primary }]}
        >
          <Avatar.Icon
            size={80}
            icon="account"
            style={{ backgroundColor: "white" }}
            color={theme.colors.primary}
          />
          <Text variant="headlineSmall" style={styles.name}>
            {userData?.username || "Nama Pengguna"}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {userData?.email || "email@example.com"}
          </Text>
        </View>

        <View style={styles.content}>
          <Text
            variant="titleMedium"
            style={{ marginBottom: 15, fontWeight: "bold" }}
          >
            Edit Profil
          </Text>

          <TextInput
            label="Username"
            value={name}
            onChangeText={setName}
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
            label="Email"
            value={userData?.email || ""}
            mode="outlined"
            style={[styles.input, { backgroundColor: "#f0f0f0" }]}
            disabled={true}
            left={<TextInput.Icon icon="email" />}
          />

          <Button
            mode="contained"
            onPress={handleSaveProfile}
            style={{ marginTop: 10, borderRadius: 8 }}
          >
            Simpan Profil
          </Button>

          <Divider style={{ marginVertical: 20 }} />

          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={{ borderColor: theme.colors.error, borderRadius: 8 }}
            onPress={showDialog}
          >
            Ubah Password
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={hideDialog}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Title
            style={{ textAlign: "center", color: theme.colors.primary }}
          >
            Ganti Password
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Password Saat Ini"
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
              label="Konfirmasi Password Baru"
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
            <HelperText type="info" visible={true}>
              Password minimal 6 karakter.
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} textColor="#666">
              Batal
            </Button>
            <Button
              onPress={handleChangePassword}
              loading={loadingPass}
              disabled={loadingPass}
              mode="contained"
              style={{ marginHorizontal: 10 }}
            >
              Simpan
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={visibleSb}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={{
          backgroundColor: isErrorSb ? theme.colors.error : "#4CAF50",
          marginBottom: 10,
        }}
        action={{
          label: "Tutup",
          onPress: onDismissSnackBar,
          textColor: "white",
        }}
      >
        {messageSb}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  name: { color: "white", fontWeight: "bold", marginTop: 10 },
  email: { color: "#E6F2FF", marginTop: 5 },
  content: { padding: 20, paddingBottom: 50 },
  input: { marginBottom: 15, backgroundColor: "white" },
  dialogInput: { marginBottom: 10, backgroundColor: "white", fontSize: 14 },
});
