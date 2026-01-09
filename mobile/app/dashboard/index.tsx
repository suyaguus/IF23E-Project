import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Button, useTheme, Text } from "react-native-paper"; 
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
          <Card style={styles.recommendationCard}>
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1522771739844-649f439f6f18' }} />
            <Card.Content style={{ padding: 10 }}>
              <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>Kamar Tipe A</Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>Rp 1.500.000 / bln</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained-tonal" compact labelStyle={{ fontSize: 12 }}>Lihat</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.recommendationCard}>
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511' }} />
            <Card.Content style={{ padding: 10 }}>
              <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>Kamar Tipe B</Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>Rp 1.200.000 / bln</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained-tonal" compact labelStyle={{ fontSize: 12 }}>Lihat</Button>
            </Card.Actions>
          </Card>
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
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    top: 40,
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
  
  horizontalScroll: { 
    marginTop: 10, 
    paddingBottom: 10 
  },
  recommendationCard: { 
    width: 220, 
    marginRight: 15, 
    backgroundColor: "#fff", 
    borderRadius: 12,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});