import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import CustomerCard from '../Components/CustomerCard';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loadCustomers = async () => {
    try {
      const response = await axios.get(
        'http://13.232.150.130:3000/api/v1/customers/get',
      );
      console.log('API response:', response.data);
      setCustomers(response.data); // Make sure your backend returns an array!
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadCustomers(); // ✅ Runs every time page is focused!
    }
  }, [isFocused]);

  const deleteCustomer = async id => {
    console.log(id);
   
    try {
      await axios.delete(
        `http://13.232.150.130:3000/api/v1/customers/delete/${id}`,
      );
      console.log(`Customer ${id} deleted`);

      // Remove from local state
      const updated = customers.filter(customer => customer._id !== id);
      setCustomers(updated);
    } catch (error) {
      console.error('Error deleting customer:', error);
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
    <View style={styles.container}>
      <Button title="Load Customers" onPress={() => loadCustomers()} />

      <FlatList
        data={customers}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <CustomerCard
            name={item.name}
            email={item.email}
            onDelete={() => deleteCustomer(item._id)}
            onUpdate={() => updateCustomer(item)}
          />
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
});
