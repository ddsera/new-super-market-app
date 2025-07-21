// RegisterScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [image, setImage] = useState(null);

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
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
      },
    );
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !reenterPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== reenterPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      let response;
      if (image) {
        // Use FormData if image is selected
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', {
          uri: image.uri,
          name: image.fileName || 'profile.jpg',
          type: image.type || 'image/jpeg',
        });
        console.log(formData);
        response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // No image, send JSON
        response = await axios.post(API_ENDPOINTS.REGISTER, {
          username,
          email,
          password,
        });
      }

      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful! Please login.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.error(
        'Registration error:',
        error.response?.data || error.message,
      );

      let errorMessage = 'Registration failed. Please try again.';

      if (error.response?.status === 409) {
        errorMessage = 'User with this email already exists';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert('Registration Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Re-enter Password"
        value={reenterPassword}
        onChangeText={setReenterPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="outlined" onPress={handlePickImage} style={styles.button}>
        {image ? 'Change Image' : 'Upload Image (Optional)'}
      </Button>
      {image && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      )}

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
