import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 14,
        marginTop: 6,
        alignSelf: "flex-start",
    },

    statusText: {
        fontSize: 12,
        marginLeft: 6,
        fontWeight: "600",
    },

    priceText: {
        color: "#666",
        marginTop: 2,
        fontSize: 13,
    },
});