import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';


import LoginScreen from './screens/Login/Login';
import Register from './screens/RegisterPage/Register';
import HomePage from './screens/HomePage/HomePage';
import CustomersPage from './screens/CustomersPage/CustomersPage';
import ItemsPage from './screens/ItemsPage/ItemsPage';
import EditCustomerScreen from './screens/EditPages/EditCustomerScreen';

const Stack = createNativeStackNavigator();

function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Merge react-native-paper and navigation themes
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="CustomersPage" component={CustomersPage} />
          <Stack.Screen name="EditCustomerScreen" component={EditCustomerScreen} />
          <Stack.Screen name="ItemsPage" component={ItemsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
