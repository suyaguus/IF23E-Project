import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Icon, Card, Button, ActivityIndicator } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { Strings } from "@/constants/strings";

// Dashboard Screen untuk Guest (Belum Login)
const DashboardGuestScreen = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalKamar: 0,
    kamarTersedia: 0,
    kamarTersewa: 0,
    kamarTidakTersedia: 0,
  });

  // Info Kos
  const kosInfo = {
    nama: "Kos Wisma Dempo",
    alamat: "Jl. Mawar Raya No. 123, Jakarta Selatan",
    kontak: "+62 812-3456-7890",
    email: "info@kosmawar.com",
    fasilitas: ["WiFi", "Parkir", "Laundry", "CCTV", "Dapur Bersama"],
  };

  useEffect(() => {
    loadStatistik();
  }, []);

  const loadStatistik = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Strings.api_kamar);
      const kamarData = response.data.kamar;

      // Hitung statistik
      const total = kamarData.length;
      const tersedia = kamarData.filter(
        (k: any) => k.statusKamar.toLowerCase() === "tersedia"
      ).length;
      const tersewa = kamarData.filter(
        (k: any) => k.statusKamar.toLowerCase() === "tersewa"
      ).length;
      const tidakTersedia = kamarData.filter(
        (k: any) =>
          k.statusKamar.toLowerCase() === "tidaktersedia" ||
          k.statusKamar.toLowerCase() === "tidak tersedia"
      ).length;

      setStats({
        totalKamar: total,
        kamarTersedia: tersedia,
        kamarTersewa: tersewa,
        kamarTidakTersedia: tidakTersedia,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0046FF" />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  return (

    // bagian isi
    <ScrollView style={styles.container}>
      {/* Header Welcome */}
      <View style={styles.headerWelcome}>
        <MaterialIcons name="home" size={60} color="#fff" />
        <Text style={styles.headerTitle}>{kosInfo.nama}</Text>
        <Text style={styles.headerSubtitle}>Sistem Informasi Kos</Text>
      </View>

      {/* Statistik Kamar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ketersediaan Kamar</Text>

        <View style={styles.statsGrid}>
          {/* Total Kamar */}
          <Card style={[styles.statCard, { borderLeftColor: "#0046FF" }]}>
            <Card.Content style={styles.statContent}>
              <MaterialIcons name="bed" size={40} color="#0046FF" />
              <Text style={styles.statNumber}>{stats.totalKamar}</Text>
              <Text style={styles.statLabel}>Total Kamar</Text>
            </Card.Content>
          </Card>

          {/* Kamar Tersedia */}
          <Card style={[styles.statCard, { borderLeftColor: "#4CAF50" }]}>
            <Card.Content style={styles.statContent}>
              <MaterialIcons name="check-circle" size={40} color="#4CAF50" />
              <Text style={styles.statNumber}>{stats.kamarTersedia}</Text>
              <Text style={styles.statLabel}>Tersedia</Text>
            </Card.Content>
          </Card>

          {/* Kamar Tersewa */}
          <Card style={[styles.statCard, { borderLeftColor: "#F44336" }]}>
            <Card.Content style={styles.statContent}>
              <MaterialIcons name="cancel" size={40} color="#F44336" />
              <Text style={styles.statNumber}>{stats.kamarTersewa}</Text>
              <Text style={styles.statLabel}>Tersewa</Text>
            </Card.Content>
          </Card>

          {/* Kamar Tidak Tersedia */}
          <Card style={[styles.statCard, { borderLeftColor: "#9E9E9E" }]}>
            <Card.Content style={styles.statContent}>
              <MaterialIcons name="remove-circle" size={40} color="#9E9E9E" />
              <Text style={styles.statNumber}>{stats.kamarTidakTersedia}</Text>
              <Text style={styles.statLabel}>Tidak Tersedia</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Informasi Kos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Kos</Text>

        <Card style={styles.infoCard}>
          <Card.Content>
            {/* Alamat */}
            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={24} color="#0046FF" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Alamat</Text>
                <Text style={styles.infoValue}>{kosInfo.alamat}</Text>
              </View>
            </View>

            {/* Kontak */}
            <View style={styles.infoRow}>
              <MaterialIcons name="phone" size={24} color="#0046FF" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Kontak</Text>
                <Text style={styles.infoValue}>{kosInfo.kontak}</Text>
              </View>
            </View>

            {/* Email */}
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={24} color="#0046FF" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{kosInfo.email}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Fasilitas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fasilitas Umum</Text>

        <Card style={styles.facilitiesCard}>
          <Card.Content>
            <View style={styles.facilitiesGrid}>
              {kosInfo.fasilitas.map((item, index) => (
                <View key={index} style={styles.facilityItem}>
                  <MaterialIcons name="check" size={20} color="#4CAF50" />
                  <Text style={styles.facilityText}>{item}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Tertarik untuk menyewa?</Text>
        <Text style={styles.ctaSubtitle}>
          Hubungi kami untuk informasi lebih lanjut
        </Text>
        <Button
          mode="contained"
          icon="phone"
          style={styles.ctaButton}
          labelStyle={styles.ctaButtonLabel}
          onPress={() => console.log("Contact pressed")}
        >
          Hubungi Kami
        </Button>
      </View>
    </ScrollView>
  );
};

// Akun Screen untuk Guest
const AkunGuestScreen = () => (
  <View style={styles.akunContainer}>
    <View style={styles.akunCard}>
      <MaterialIcons name="account-circle" size={100} color="#0046FF" />
      <Text style={styles.akunTitle}>Belum Login</Text>
      <Text style={styles.akunSubtitle}>
        Silakan login untuk mengakses fitur lengkap
      </Text>

      <Button
        mode="contained"
        icon="login"
        style={styles.loginButton}
        labelStyle={styles.loginButtonLabel}
        onPress={() => console.log("Login pressed")}
      >
        Login
      </Button>

      <Button
        mode="outlined"
        icon="account-plus"
        style={styles.registerButton}
        labelStyle={styles.registerButtonLabel}
        onPress={() => console.log("Register pressed")}
      >
        Daftar
      </Button>
    </View>
  </View>
);

// Custom Drawer Content
interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      {/* Header Drawer */}
      <View style={styles.drawerHeader}>
        <MaterialIcons name="home-work" size={80} color="#fff" />
        <Text style={styles.drawerHeaderText}>Kos Mawar</Text>
        <Text style={styles.drawerHeaderSubtext}>Guest Mode</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer Drawer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>Version 1.0.0</Text>
        <Text style={styles.drawerFooterText}>© 2025 Kos Mawar</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

export default function DashboardGuestPage() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#0046FF",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
        drawerItemStyle: {
          borderRadius: 8,
          marginVertical: 4,
          paddingVertical: 4,
        },
        headerStyle: {
          backgroundColor: "#0046FF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardGuestScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Akun"
        component={AkunGuestScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  headerWelcome: {
    backgroundColor: "#0046FF",
    padding: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginTop: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    elevation: 2,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#fff",
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  facilitiesCard: {
    backgroundColor: "#fff",
    elevation: 2,
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  ctaSection: {
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "#0046FF",
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  ctaButtonLabel: {
    fontSize: 16,
    color: "#fff",
  },
  akunContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  akunCard: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 300,
  },
  akunTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  akunSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: "#0046FF",
    paddingVertical: 8,
    paddingHorizontal: 48,
    marginBottom: 12,
    width: "100%",
  },
  loginButtonLabel: {
    fontSize: 16,
    color: "#fff",
  },
  registerButton: {
    borderColor: "#0046FF",
    paddingVertical: 8,
    paddingHorizontal: 48,
    width: "100%",
  },
  registerButtonLabel: {
    fontSize: 16,
    color: "#0046FF",
  },
  drawerContent: {
    backgroundColor: "#fff",
  },
  drawerHeader: {
    backgroundColor: "#0046FF",
    padding: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  drawerHeaderSubtext: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 4,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
  drawerFooterText: {
    color: "#999",
    fontSize: 12,
    marginVertical: 2,
  },
});
