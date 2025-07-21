// screens/EditCustomerScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function EditCustomerScreen({ route, navigation }) {
  // Get params passed from CustomersPage
  const {
    id,
    name: initialName,
    email: initialEmail,
    image: initialImage,
  } = route.params;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState(null); // For new picked image
  const [currentImage, setCurrentImage] = useState(initialImage); // For current image filename

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert(
          'Image Picker Error',
          response.errorMessage || 'Unknown error',
        );
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  // Update only name/email
  const handleUpdate = async () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Email must contain "@"');
      return;
    }
    try {
      const headers = await getAuthHeaders();
      await axios.put(
        `${API_ENDPOINTS.CUSTOMERS}/update/${id}`,
        {
          name: name,
          email: email,
        },
        { headers },
      );
      Alert.alert('Success', 'Customer updated!');
      navigation.goBack(); // Go back to CustomersPage
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update customer.');
    }
  };

  // Update only the image
  const handleUpdateImage = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please pick an image first.');
      return;
    }
    try {
      const headers = await getAuthHeaders();
      let formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: image.fileName || 'customer.jpg',
        type: image.type || 'image/jpeg',
      });

      await axios.put(
        `${API_ENDPOINTS.CUSTOMERS}/updateCustomerImage/${id}`,
        formData,
        { headers: { ...headers, 'Content-Type': 'multipart/form-data' } },
      );
      Alert.alert('Success', 'Customer image updated!');
      navigation.goBack();
    } catch (error) {
      console.error('Update image error:', error);
      Alert.alert('Error', 'Failed to update customer image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Customer</Text>
      <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerBtn}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        ) : currentImage ? (
          <Image
            source={{
              uri: `http://13.232.150.130:3000/api/v1/uploads/${currentImage}`,
            }}
            style={styles.imagePreview}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <Button title="Update Image" onPress={handleUpdateImage} />
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
  imagePickerBtn: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ff9800',
    backgroundColor: '#2c313a',
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff9800',
    marginBottom: 8,
  },
  placeholderText: {
    color: '#888',
    fontSize: 13,
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
