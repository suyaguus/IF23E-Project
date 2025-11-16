import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function UserViewPage() {
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%'}}>
            {/* Area Header */}
            <Text style={[styles.warna_bg, {textAlign: "center"}]}>
                Halaman View User
            </Text>

            {/* Area Content */}

            {/* Area FAB */}

            
        </View>
    )
}

// bagian style

const size = 20;
const styles = StyleSheet.create({
  warna_bg: {
    backgroundColor: 'black',
    color: '#fff',
    fontSize: size,
  }
});