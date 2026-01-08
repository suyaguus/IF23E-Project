import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

export default function LaporScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Lapor Kerusakan</Text>
      
      <TextInput 
        label="Deskripsi Laporan" 
        mode="outlined" 
        multiline 
        numberOfLines={4} 
        style={styles.input} 
      />
      
      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Kirim Laporan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontWeight: "bold", marginBottom: 20 },
  input: { marginBottom: 20 },
  button: { borderRadius: 8 }
});