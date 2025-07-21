import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import CustomerCard from '../Components/CustomerCard';
import { useNavigation } from '@react-navigation/native';

import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(API_ENDPOINTS.CUSTOMERS + '/get', {
        headers,
      });
      setCustomers(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load customers');
    }
  };

  const deleteCustomer = async id => {
    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${API_ENDPOINTS.CUSTOMERS}/delete/${id}`, {
        headers,
      });
      setCustomers(prev => prev.filter(customer => customer._id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete customer');
    }
  };

  const updateCustomer = customer => {
    navigation.navigate('EditCustomerScreen', {
      id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Customers</Text>
        {customers.length === 0 ? (
          <Text style={styles.emptyText}>No customers found.</Text>
        ) : (
          <FlatList
            data={customers}
            keyExtractor={item =>
              item._id ? item._id.toString() : Math.random().toString()
            }
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <CustomerCard
                  name={item.name}
                  email={item.email}
                  imageUrl={item.image} // <-- This is the key!
                  onDelete={() => deleteCustomer(item._id)}
                  onUpdate={() => updateCustomer(item)}
                />
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 80,
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
