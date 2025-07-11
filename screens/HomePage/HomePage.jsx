// HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Home</Title>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('CustomersPage')}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Customers
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('ItemsPage')}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Items
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
    marginBottom: 40,
    fontSize: 28,
    color: '#ffffff',
  },
  button: {
    marginVertical: 10,
  },
  buttonContent: {
    height: 60, // makes it large
  },
});
