// HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, IconButton } from 'react-native-paper';


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Small button in the top-right corner for ImageLoad */}
      <IconButton
        icon="image"
        size={24}
        style={styles.imageButton}
        onPress={() => navigation.navigate('ImageList')}
        accessibilityLabel="Go to ImageList"
      />
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
  imageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#fff',
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
