import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Icon } from "react-native-paper";
import KamarPage from "@/app/kamar/page";

const HomeScreen = () => (
  <View style={styles.screen}>
    <View style={styles.card}>
      <Icon source="home" size={60} color="#0046FF" />
      <Text style={styles.title}>Dashboard Admin</Text>
      <Text style={styles.subtitle}>Selamat datang di sistem manajemen kos</Text>
    </View>
  </View>
);

const FasilitasScreen = () => (
  <View style={styles.screen}>
    <View style={styles.card}>
      <Icon source="sofa" size={60} color="#0046FF" />
      <Text style={styles.title}>Fasilitas</Text>
      <Text style={styles.subtitle}>Kelola fasilitas kos</Text>
    </View>
  </View>
);

const PerabotanScreen = () => (
  <View style={styles.screen}>
    <View style={styles.card}>
      <Icon source="cupboard-outline" size={60} color="#0046FF" />
      <Text style={styles.title}>Perabotan</Text>
      <Text style={styles.subtitle}>Kelola perabotan kamar</Text>
    </View>
  </View>
);

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      {/* Header Drawer */}
      <View style={styles.drawerHeader}>
        <Icon source="account-circle" size={80} color="#fff" />
        <Text style={styles.drawerHeaderText}>Admin</Text>
        <Text style={styles.drawerHeaderSubtext}>Sistem Manajemen Kos</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer Drawer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>Version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

export default function DashboardAdminPage() {
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
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Kamar"
        component={KamarPage}
        options={{
          title: "Kelola Kamar",
          drawerIcon: ({ color, size }) => (
            <Icon source="bed" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Fasilitas"
        component={FasilitasScreen}
        options={{
          title: "Kelola Fasilitas",
          drawerIcon: ({ color, size }) => (
            <Icon source="sofa" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perabotan"
        component={PerabotanScreen}
        options={{
          title: "Kelola Perabotan",
          drawerIcon: ({ color, size }) => (
            <Icon source="cupboard-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0046FF",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
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
  },
});