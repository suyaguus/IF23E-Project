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

export default function Adminpage() {
  // kategori filter aktif
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // daftar favorit (pakai nomor kamar)
  const [favorites, setFavorites] = useState<number[]>([]);

  // kategori kamar
  const categories = ['Semua', 'Putra', 'Putri', 'Campur'];

  // data kamar
  const kostList = [
    {
      roomNumber: 101,
      status: 'Kosong',
      price: 1200000,
      rating: 4.8,
      facilities: 5,
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      category: 'Putri',
    },
    {
      roomNumber: 102,
      status: 'Terisi',
      price: 950000,
      rating: 4.6,
      facilities: 4,
      image:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      category: 'Putra',
    },
    {
      roomNumber: 103,
      status: 'Kosong',
      price: 1500000,
      rating: 4.9,
      facilities: 6,
      image:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      category: 'Putri',
    },
    {
      roomNumber: 104,
      status: 'Terisi',
      price: 800000,
      rating: 4.5,
      facilities: 3,
      image:
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop',
      category: 'Campur',
    },
  ];

  // toggle favorit
  const toggleFavorite = (roomNumber: number) => {
    setFavorites(prev =>
      prev.includes(roomNumber)
        ? prev.filter(f => f !== roomNumber)
        : [...prev, roomNumber],
    );
  };

  // filter kategori
  const filteredKost =
    selectedCategory === 'Semua'
      ? kostList
      : kostList.filter(kost => kost.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Hai, Selamat Datang! 👋</Text>
              <Text style={styles.subGreeting}>Temukan kamar terbaik</Text>
            </View>           
          </View>
        </View>
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
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  greeting: {
    fontSize: 20,
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

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
