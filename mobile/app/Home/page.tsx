import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function HomePage() {

  //state kategory terpilih
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  //state daftar favorit (menyimpan id kost)
  const [favorites, setFavorites] = useState<number[]>([]);

  // daftar kategori filter
  const categories = ['Semua', 'Putra', 'Putri', 'Campur'];

  // data daftar kamar kost
  const kostList = [
    {
      roomNumber: 101,
      status: 'Kosong',
      price: 1200000,
      rating: 4.8,
      facilities: 5,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      category: 'Putri',
    },
    {
      roomNumber: 102,
      status: 'Terisi',
      price: 950000,
      rating: 4.6,
      facilities: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      category: 'Putra',
    },
    {
      roomNumber: 103,
      status: 'Kosong',
      price: 1500000,
      rating: 4.9,
      facilities: 6,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      category: 'Putri',
    },
    {
      roomNumber: 104,
      status: 'Terisi',
      price: 800000,
      rating: 4.5,
      facilities: 3,
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop',
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

}