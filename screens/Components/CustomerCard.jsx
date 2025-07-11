import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function CustomerCard({ name, email, onDelete, onUpdate }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Button  title="Delete" color="red" onPress={onDelete} />
      <Button  title="Update" onPress={onUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#0F828C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',

  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 50,
    
  },
  buttonUpdate: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
