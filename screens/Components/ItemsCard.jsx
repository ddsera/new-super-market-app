import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ItemsCard({ name, price, imageUrl }) {
  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image
          source={{
            uri: `http://13.232.150.130:3000/api/v1/uploads/${imageUrl}`,
          }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.name}>Item: {name}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 12,
    backgroundColor: '#23272f', // dark card background
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3a3f47', // dark border
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ff9800', // accent border
    backgroundColor: '#2c313a',
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    backgroundColor: '#2c313a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff9800', // accent border
  },
  placeholderText: {
    color: '#888',
    fontSize: 13,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#f5f6fa', // light text
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 16,
    color: '#ff9800', // accent color
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
