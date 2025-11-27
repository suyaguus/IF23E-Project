import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { styles } from "@/styles/home";
import { Icon } from "react-native-paper";

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
  </View>
);

const KamarScreen = () => (
  <View style={styles.screen}>
    <Text>Kamar Screen</Text>
  </View>
);

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Optional custom items */}
      {/* <View style={styles.customItem}>
        <Text style={styles.customText}>Custom Item</Text>
      </View> */}
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

export default function DashboardUserPage() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Kamar"
        component={KamarScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon source="bed" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
