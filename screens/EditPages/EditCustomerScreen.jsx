// screens/EditCustomerScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function EditCustomerScreen({ route, navigation }) {
  // Get params passed from CustomersPage
  const { id, name: initialName, email: initialEmail } = route.params;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const handleUpdate = async () => {
    if (!email.includes('@')) {
        Alert.alert('Invalid Email', 'Email must contain "@"');
        return;
      }
    try {
      await axios.put(
        `http://13.232.150.130:3000/api/v1/customers/update/${id}`,
        {
          name: name,
          email: email,
        },
      );
      Alert.alert('Success', 'Customer updated!');
      navigation.goBack(); // Go back to CustomersPage
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update customer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Customer</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={val => setName(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    color: 'black',
  },
});
