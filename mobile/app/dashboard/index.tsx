import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Button, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native"; 

export default function DashboardPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme(); 

  const kosInfo = {
    nama: "Wisma Dempo",
    alamat: "Jl. Dempo, Labuhan Ratu, Kec. Kedaton, Kota Bandar Lampung, Lampung 35132",
    fasilitas: ["WiFi", "Parkir", "AC", "Dapur"],
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <MaterialIcons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <MaterialIcons
          name="home-work"
          size={60}
          color="#fff"
          style={{ marginTop: 10 }}
        />
        <Text style={styles.headerTitle}>{kosInfo.nama}</Text>
        <Text style={styles.headerSubtitle}>Guest Mode (Belum Login)</Text>
      </View>

      {/* Info Kos */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Informasi
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={theme.colors.secondary}
              />
              <Text style={styles.text}>{kosInfo.alamat}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Fasilitas */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Fasilitas
        </Text>
        <View style={styles.grid}>
          {kosInfo.fasilitas.map((item, index) => (
            <View
              key={index}
              style={[styles.chip, { borderColor: theme.colors.secondary }]}
            >
              <MaterialIcons
                name="check-circle"
                size={18}
                color={theme.colors.secondary}
              />
              <Text style={{ marginLeft: 5, color: "#333" }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rekomendasi Kos */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Rekomendasi Kos
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {/* Kartu akan diletakkan di sini */}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ textAlign: "center", marginBottom: 10, color: "#666" }}>
          Ingin booking kamar?
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push("/auth/login")}
          style={{ backgroundColor: theme.colors.primary }}
        >
          Login Sekarang
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative", // Untuk absolute positioning tombol menu
  },
  menuButton: {
    position: "absolute",
    top: 40, // Sesuaikan dengan StatusBar
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  headerSubtitle: { color: "#E6F2FF", marginTop: 5 },
  section: { padding: 20, paddingBottom: 0 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#fff", elevation: 3 },
  row: { flexDirection: "row", alignItems: "center" },
  text: { marginLeft: 10, fontSize: 15, color: "#444", flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  footer: { padding: 30, marginTop: 10, marginBottom: 20 },
});
