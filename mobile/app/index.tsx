import { View } from "react-native";
import React from "react";
import {
  BottomNavigation,
  Text,
  Icon,
  Searchbar,
  Appbar,
} from "react-native-paper";
import { styles } from "@/styles/home";
import { Section } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import DashboardUserPage from "./dashboard/user/page";
import KamarPage from "./kamar/page";
import DashboardAdminPage from "./dashboard/admin/page";

export default function HomePage() {
  const Home = () => <View style={{ flex: 1 }} />;

  const Kamar = () => <View style={{ flex: 1 }} />;

  const Account = () => <View style={{ flex: 1 }} />;

  const [searchQuery, setSearchQuery] = React.useState("");

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "Home",
      title: "",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "Kamar",
      title: "",
      focusedIcon: "bed",
      unfocusedIcon: "bed-outline",
    },
    {
      key: "Account",
      title: "",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Kamar: Kamar,
    Account: Account,
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* bagian header */}

      {/* <Text>Testing</Text> */}

      {/* bagian search bar */}
      {/* <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      /> */}

      {/* bagian bottom navigation */}
      {/* <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      /> */}
      <DashboardAdminPage />
    </View>
  );
}
