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

  const kosRules = [
    "Dilarang membawa hewan peliharaan.",
    "Tamu wajib lapor ke pengelola.",
    "Jam malam maksimal pukul 22.00.",
    "Dilarang merokok di dalam kamar.",
    "Menjaga kebersihan lingkungan kos.",
    "Dilarang membawa tamu lawan jenis ke dalam kamar.",
    "Penghuni wajib menjaga kebersihan kamar dan area bersama."
  ];


  const kosInfo = {
    nama: "Wisma Dempo",
    alamat: "Jl. Dempo, Labuhan Ratu, Kec. Kedaton, Kota Bandar Lampung, Lampung 35132",
    fasilitas: ["WiFi", "Parkir", "AC", "Dapur", "Kasur", "Lemari"],
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

      {/* Peraturan Kost */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Peraturan Kost
        </Text>

        <View style={styles.badge}>
          <MaterialIcons name="priority-high" size={14} color="#fff" />
          <Text style={styles.badgeText}>Wajib Dipatuhi</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            {kosRules.map((rule, index) => (
              <View key={index} style={styles.ruleRow}>
                <MaterialIcons
                  name="warning"
                  size={20}
                  color="#F59E0B"
                />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}

            {/* Peringatan Sanksi */}
            <View style={styles.sanctionBox}>
              <MaterialIcons name="report" size={20} color="#B91C1C" />
              <Text style={styles.sanctionText}>
                Setiap pelanggaran terhadap peraturan kost akan dikenakan sanksi sesuai
                dengan kebijakan pengelola.
              </Text>
            </View>
          </Card.Content>
        </Card>
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
              <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>Kamar Khusus Laki-laki</Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>Rp 1.500.000 / bln</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained-tonal" compact labelStyle={{ fontSize: 12 }}>Lihat</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.recommendationCard}>
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511' }} />
            <Card.Content style={{ padding: 10 }}>
              <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>Kamar Khusus Perempuan</Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>Rp 1.200.000 / bln</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained-tonal" compact labelStyle={{ fontSize: 12 }}>Lihat</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.recommendationCard}>
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511' }} />
            <Card.Content style={{ padding: 10 }}>
              <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>Kamar Campur</Text>
              <Text variant="bodySmall" style={{ color: '#666' }}>Rp 1.300.000/ bln</Text>
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
  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  ruleText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
    flex: 1,
    lineHeight: 20,
  },

  sectionHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
},

badge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#DC2626", // merah
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},

badgeText: {
  color: "#fff",
  fontSize: 12,
  marginLeft: 4,
  fontWeight: "600",
},
sanctionBox: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: 10,
  padding: 12,
  backgroundColor: "#FEF2F2", // merah soft
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#FCA5A5",
},

sanctionText: {
  marginLeft: 10,
  fontSize: 13,
  color: "#7F1D1D",
  lineHeight: 18,
  flex: 1,
},
});