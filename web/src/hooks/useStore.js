import { useState, useEffect } from 'react';
import localforage from 'localforage';

// Initialize localforage (better than localStorage)
localforage.config({
  name: 'ErgoWellness',
  storeName: 'ergowellness_data',
});

export function useStore() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const getStore = async (key, defaultValue = null) => {
    try {
      const value = await localforage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error('Error getting store value:', error);
      return defaultValue;
    }
  };

  const setStore = async (key, value) => {
    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.error('Error setting store value:', error);
    }
  };

  const removeStore = async (key) => {
    try {
      await localforage.removeItem(key);
    } catch (error) {
      console.error('Error removing store value:', error);
    }
  };

  const clearStore = async () => {
    try {
      await localforage.clear();
    } catch (error) {
      console.error('Error clearing store:', error);
    }
  };

  return { getStore, setStore, removeStore, clearStore, isReady };
}
