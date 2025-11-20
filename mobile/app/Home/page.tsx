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

}