import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ItemsCard from '../Components/ItemsCard';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(API_ENDPOINTS.ITEMS + '/get', {
        headers,
      });
      console.log('Items API response:', response.data);
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <ItemsCard name={item.name} price={item.price} imageUrl={item.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
