import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const saveData = async (key: string, value: object): Promise<void> => {
  const stringValue = JSON.stringify(value);

  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  } else {
    // Para iOS y Android: Usar SecureStore
    try {
      await SecureStore.setItemAsync(key, stringValue);
    } catch (error) {
      console.error('Error saving data to SecureStore:', error);
    }
  }
};

export const getData = async (key: string): Promise<object | null> => {
  if (Platform.OS === 'web') {
    // Para Web: Obtener datos de localStorage
    try {
      const stringValue = localStorage.getItem(key);
      return stringValue ? JSON.parse(stringValue) : null;
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return null;
    }
  } else {
    // Para iOS y Android: Obtener datos de SecureStore
    try {
      const stringValue = await SecureStore.getItemAsync(key);
      return stringValue ? JSON.parse(stringValue) : null;
    } catch (error) {
      console.error('Error getting data from SecureStore:', error);
      return null;
    }
  }
};

export const deleteData = async (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    // Para Web: Eliminar datos de localStorage
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting data from localStorage:', error);
    }
  } else {
    // Para iOS y Android: Eliminar datos de SecureStore
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error deleting data from SecureStore:', error);
    }
  }
};