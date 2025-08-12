// Import React Hooks
import { useState, useEffect } from "react";

/**
 * Custom hook to manage state that's persisted in localStorage.
 *
 * @param {string} key - The key for storing the value in localStorage.
 * @param {*} [initialValue=""] - The initial value if no value exists in localStorage.
 * @returns {[any, function]} An array with the current value and a function to update is.
 */
function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    // Read from localStorage
    const valueFromLocalStorage = localStorage.getItem(key);

    if (valueFromLocalStorage !== null) {
      // If data exists, parse it from JSON string
      return JSON.parse(valueFromLocalStorage);
    }

    if (typeof initialValue === "function") {
      // If no data exists, and initialValue is a func, call that func to get the initial value
      return initialValue();
    }

    // Otherwise, use the initialValue
    return initialValue;
  });

  // This effect runs whenever value changes.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
