import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

// library pada menu icon
const MenuIcon = ({ name, color }) => <Text style={{ fontSize: 28, color: blue }}>{name}</Text>;

// komponen untuk setiap item menu
const MenuItem = ({ title, iconName, iconColor, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.menuItem}>
      <MenuIcon name={iconName} color={iconColor} />
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
)

export default function Adminpage() {

  // Daftar menu utama dahboard
  const menuItems = [
        { id: 'user', title: 'Data User', icon: '👤', color: '#2563eb' },      // Biru
        { id: 'kamar', title: 'Data Kamar', icon: '🏠', color: '#10b981' },    // Hijau
        { id: 'perabotan', title: 'Perabotan', icon: '🛋️', color: '#f97316' },  // Orange
        { id: 'fasilitas', title: 'Fasilitas', icon: '🚿', color: '#9333ea' },  // Ungu
        { id: 'order', title: 'Order', icon: '📦', color: '#db2777' },          // Pink
        { id: 'pembayaran', title: 'Pembayaran', icon: '💳', color: '#6d28d9' }, // Violet
    ];

  const handleMenuPress = (menuId: string) => {
        // Logika navigasi ke halaman detail menu
        alert(`Simulasi: Navigasi ke Halaman ${menuItems.find(m => m.id === menuId)?.title}`);
        console.log(`Navigasi ke: ${menuId}`);
    };

  return (
    <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1e40af" /> 

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Dashboard Admin</Text>
                        <Text style={styles.subGreeting}>Akses cepat ke data master</Text>
                    </View>
                    {/* Placeholder Avatar Admin */}
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View> 
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.sectionTitle}>Menu Utama</Text>
                
                {/* GRID MENU */}
                <View style={styles.menuGrid}>
                    {menuItems.map(item => (
                        <MenuItem 
                            key={item.id}
                            title={item.title}
                            iconName={item.icon}
                            iconColor={item.color}
                            onPress={() => handleMenuPress(item.id)}
                        />
                    ))}
                </View>

                {/* informasi bagian status */}
                <Text style={styles.sectionTitle}>Informasi Cepat</Text>
                
                <View style={styles.quickInfoCard}>
                    <Text style={styles.quickInfoText}>Total Kamar Kosong: 5</Text>
                    <Text style={styles.quickInfoText}>Order Baru Hari Ini: 2</Text>
                </View>
                
                <View style={{ height: 50 }} /> {/* Padding di bawah ScrollView */}
            </ScrollView>
        </SafeAreaView>
  );
}

// ------------ STYLE --------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  header: {
    padding: 20,
    backgroundColor: '#2563eb', 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: (StatusBar.currentHeight || 20) + 10,
  },

 headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  subGreeting: {
    fontSize: 14,
    color: '#dbeafe',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  scrollContent: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    marginTop: 10,
  },

   menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  menuItem: {
    width: '48%', // Untuk dua kolom
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#374151',
  },

  quickInfoCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
  },

  quickInfoText: {
      fontSize: 15,
      color: '#4b5563',
      paddingVertical: 5,
  }
});
  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  categoriesContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },

  categoriesScroll: {
    gap: 10,
  },

  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
  },

  categoryButtonActive: {
    backgroundColor: '#2563eb',
  },

  categoryText: {
    color: '#374151',
    fontSize: 14,
  },

  categoryTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },

  popularSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  seeAll: {
    fontSize: 14,
    color: '#2563eb',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  favoriteIcon: {
    fontSize: 24,
  },

  typeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  typeBadgeText: {
    color: 'white',
    fontSize: 12,
  },

  cardContent: {
    marginTop: 10,
  },

  kostName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  locationIcon: {
    marginRight: 5,
    fontSize: 14,
  },

  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  star: {
    marginRight: 4,
  },

  rating: {
    fontWeight: 'bold',
    marginRight: 4,
  },

  reviews: {
    color: '#6b7280',
  },

  facilities: {
    flexDirection: 'row',
    gap: 5,
  },

  facilityIcon: {
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  priceUnit: {
    fontSize: 12,
    color: '#6b7280',
  },

  viewButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },

  navItem: {
    alignItems: 'center',
  },

  navIconActive: {
    fontSize: 22,
    color: '#2563eb',
  },

  navTextActive: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: 'bold',
  },

  navIcon: {
    fontSize: 22,
    color: '#6b7280',
  },

  navText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
