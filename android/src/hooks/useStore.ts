import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = '@ErgoWellness:';

export function useStore() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const getStore = async (key: string, defaultValue: any = null) => {
    try {
      const value = await AsyncStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (value !== null) {
        return JSON.parse(value);
      }
      return defaultValue;
    } catch (error) {
      console.error('Error getting store value:', error);
      return defaultValue;
    }
  };

  const setStore = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting store value:', error);
    }
  };

  const removeStore = async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing store value:', error);
    }
  };

  const clearStore = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => key.startsWith(STORAGE_PREFIX));
      await AsyncStorage.multiRemove(filteredKeys);
    } catch (error) {
      console.error('Error clearing store:', error);
    }
  };

  return { getStore, setStore, removeStore, clearStore, isReady };
}
