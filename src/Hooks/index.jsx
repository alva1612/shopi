import { useState } from "react";

/**
 * @function useLocalStorage - LocalStorage state helper
 * @param key {string} - Key identifier in localStorage
 * @returns - getter and setter for such key
 */
export const useLocalStorage = (key) => {
  const [item, setItem] = useState();
  const getItem = () => {
    if (item) return item;
    const storedItem = localStorage.getItem(key);
    return JSON.parse(storedItem);
  };
  const saveItem = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setItem(data);
  };
  const clearItem = () => {
    localStorage.removeItem(key);
    setItem(null);
  };

  return { getItem, saveItem, clearItem };
};
