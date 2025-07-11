import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemsCard({ name, price }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Item: {name}</Text>
      <Text>Price: ${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
