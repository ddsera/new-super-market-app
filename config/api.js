// API Configuration
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'http://13.232.150.130:3000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/v1/users/login`,
  REGISTER: `${API_BASE_URL}/api/v1/users/register`,
  CUSTOMERS: `${API_BASE_URL}/api/v1/customers`,
  ITEMS: `${API_BASE_URL}/api/v1/items`,
  IMAGES: `${API_BASE_URL}/api/v1/uploads/images`,
  UPLOADS: `${API_BASE_URL}/api/v1/uploads`,
};

export const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};
