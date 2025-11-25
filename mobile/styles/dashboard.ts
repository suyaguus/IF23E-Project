import { StyleSheet } from "react-native";

// buat css (styling)
const size = 20;

export const styles = StyleSheet.create({
    warna_bg: {
        backgroundColor: "#a51c31",
        color: "#ffffff",
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
        backgroundColor: "#a51c31",
        color: "#fff",
    },

    card: {
        margin: 20,
    },

    text_input: {
        backgroundColor: "#fff",
        marginVertical: 5,
    }
});