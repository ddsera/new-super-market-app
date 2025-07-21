// LoginScreen.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { API_ENDPOINTS } from '../../config/api';

// Logo Component
const Logo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoCircle}>
      <Text style={styles.logoText}>SM</Text>
    </View>
    <Text style={styles.logoTitle}>SuperMarket</Text>
    <Text style={styles.logoSubtitle}>Your Shopping Partner</Text>
  </View>
);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      console.log('=== LOGIN DEBUG ===');
      console.log('Email:', email);
      console.log('Password length:', password.length);
      console.log('API endpoint:', API_ENDPOINTS.LOGIN);
      console.log('Attempting login with:', { email, password: '***' });

      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      console.log('Login response:', response.data);

      // Handle JWT token in response
      const { token, message } = response.data;
      if (token) {
        await AsyncStorage.setItem('token', token);
        const savedToken = await AsyncStorage.getItem('token');
        console.log('Token saved in AsyncStorage:', savedToken);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Error', message || 'No token received from server');
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.code,
        url: error.config?.url,
      });

      let errorMessage = 'Login failed. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found';
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        errorMessage =
          'Cannot connect to server. Please check your internet connection.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />

      <Title style={styles.title}>Login</Title>

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

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
