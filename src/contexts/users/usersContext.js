import { createContext, useContext } from "react";

export const UsersContext = createContext();

// Custom hook to use the context
export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }

  return context;
};
