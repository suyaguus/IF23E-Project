import { StyleSheet } from "react-native";

// buat css (styling)
const size = 20;

export const styles = StyleSheet.create({
    warna_bg: {
        backgroundColor: "#0046FF", // Ganti dengan warna biru yang diinginkan
        color: "#ffffff", // Teks tetap putih agar kontras
        fontSize: size,
    },

    jarak: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    fab: {
        position: "absolute",
        margin: 15,
        right: 0,
        bottom: 0,
        backgroundColor: "#0046FF", // Warna biru pada FAB
        color: "#fff",
    },

    card: {
        margin: 20,
        backgroundColor: "#f5f5f5", // Ganti dengan warna latar belakang lebih netral
    },

    text_input: {
        backgroundColor: "#fff", // Warna putih tetap untuk input teks
        marginVertical: 5,
    },

    // Tambahkan beberapa style baru untuk konsistensi tema
    button: {
        backgroundColor: "#0046FF", // Ganti tombol menjadi biru
        color: "#ffffff",
    },

    buttonWhite: {
        backgroundColor: "white", // Warna tombol edit tetap putih
        color: "black",
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0046FF", // Warna biru pada title card
    },

    cardSubtitle: {
        color: "#0046FF", // Warna biru untuk subtitle
    },
    
    snackbar: {
        backgroundColor: "#0046FF", // Snackbar dengan latar biru
        color: "white", // Teks snackbar putih
    },
});
