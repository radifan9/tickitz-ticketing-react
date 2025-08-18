import { createContext, useContext } from "react";

export const HistoryContext = createContext();

// Custom hook to use the context
export const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }

  return context;
};
