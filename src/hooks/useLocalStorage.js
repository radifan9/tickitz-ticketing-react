import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem(key);

    if (valueFromLocalStorage !== null) {
      return JSON.parse(valueFromLocalStorage);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
