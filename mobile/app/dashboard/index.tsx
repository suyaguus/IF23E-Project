import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Button, useTheme, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { styles } from "../../styles/guest";

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

  const rekomendasiKamar = [
    {
      title: "Kamar Khusus Laki-laki",
      price: "Rp 900.000 / bln",
      image:
        "https://images.unsplash.com/photo-1522771739844-649f439f6f18",
      available: true,
    },
    {
      title: "Kamar Khusus Perempuan",
      price: "Rp 800.000 / bln",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511",
      available: false,
    },
    {
      title: "Kamar Campur",
      price: "Rp 1.300.000 / bln",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511",
      available: true,
    },
     {
      title: "Kamar Khusus Perempuan",
      price: "Rp 800.000 / bln",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511",
      available: false,
    },
     {
      title: "Kamar Khusus Laki-laki",
      price: "Rp 900.000 / bln",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511",
      available: false,
    },
     {
      title: "Kamar Campur",
      price: "Rp 1.300.000 / bln",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7eaa511",
      available: true,
    },
  ];

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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rekomendasiKamar.map((item, index) => (
            <Card key={index} style={styles.recommendationCard}>
              <Card.Cover source={{ uri: item.image }} />

              <Card.Content style={{ padding: 10 }}>
                <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
                  {item.title}
                </Text>

                <Text style={styles.priceText}>{item.price}</Text>

                {/* STATUS KAMAR */}
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: item.available
                        ? "#DCFCE7"
                        : "#FEE2E2",
                    },
                  ]}
                >
                  <MaterialIcons
                    name={item.available ? "check-circle" : "cancel"}
                    size={14}
                    color={item.available ? "#16A34A" : "#DC2626"}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: item.available
                          ? "#166534"
                          : "#7F1D1D",
                      },
                    ]}
                  >
                    {item.available ? "Tersedia" : "Penuh"}
                  </Text>
                </View>
              </Card.Content>

              <Card.Actions>
                <Button
                  mode="contained-tonal"
                  compact
                  disabled={!item.available}
                >
                  Lihat
                </Button>
              </Card.Actions>
            </Card>
          ))}
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
