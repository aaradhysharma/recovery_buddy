import { useCallback } from 'react';

export function useStore() {
  const getStore = useCallback(async (key, defaultValue) => {
    if (window.electronAPI) {
      return await window.electronAPI.getStore(key, defaultValue);
    }
    // Fallback to localStorage for web version
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }, []);

  const setStore = useCallback(async (key, value) => {
    if (window.electronAPI) {
      return await window.electronAPI.setStore(key, value);
    }
    // Fallback to localStorage
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }, []);

  const deleteStore = useCallback(async (key) => {
    if (window.electronAPI) {
      return await window.electronAPI.deleteStore(key);
    }
    localStorage.removeItem(key);
    return true;
  }, []);

  const getAllStore = useCallback(async () => {
    if (window.electronAPI) {
      return await window.electronAPI.getAllStore();
    }
    // Fallback: get all localStorage
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      all[key] = JSON.parse(localStorage.getItem(key));
    }
    return all;
  }, []);

  return { getStore, setStore, deleteStore, getAllStore };
}
