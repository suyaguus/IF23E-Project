import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Background colors
    warna_bg: {
        backgroundColor: "#0046FF",
    },
    warna_bg_light: {
        backgroundColor: "#E6EDFF",
    },

    // Screen layouts
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },

    // Card components
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

    // Typography
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

    // Drawer styles
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

    // Custom drawer items
    customItem: {
        padding: 15,
        backgroundColor: "#E6EDFF",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    customText: {
        fontSize: 16,
        color: "#0046FF",
        fontWeight: "600",
    },
});