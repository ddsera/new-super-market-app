// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';

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

  const handleLogin = () => {
    // Replace with your login logic
    console.log('Email:', email);
    console.log('Password:', password);
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

      <Button mode="contained" onPress={() => navigation.navigate('Home')} style={styles.button}>
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
