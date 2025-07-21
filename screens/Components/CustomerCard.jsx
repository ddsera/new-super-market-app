import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function CustomerCard({
  name,
  email,
  imageUrl,
  onDelete,
  onUpdate,
}) {
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
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonUpdate} onPress={onUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 22,
    backgroundColor: '#23272f',
    borderRadius: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3f47',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ff9800',
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
    borderColor: '#ff9800',
  },
  placeholderText: {
    color: '#888',
    fontSize: 13,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ff9800',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  email: {
    fontSize: 16,
    color: '#f5f6fa',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 12,
    shadowColor: '#e53935',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
