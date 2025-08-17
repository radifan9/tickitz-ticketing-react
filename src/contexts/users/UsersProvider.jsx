import { UsersContext } from "./usersContext";

// --- Use custom hook
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useReducer } from "react";

// --- Default users data
const DEFAULT_USERS = [
  {
    id: "1",
    email: "alice@example.com",
    password: "alice@1AA",
    role: "admin",
    full_name: "Admin",
    phone_number: "911",
    created_at: "2025-08-13T14:32:00Z",
    updated_at: "2025-08-13T14:32:00Z",
  },
  {
    id: "2",
    email: "bob@example.com",
    password: "b0b123Ad*aa",
    role: "user",
    full_name: "Bob The Builder",
    phone_number: "911",
    created_at: "2025-08-13T15:00:00Z",
    updated_at: "2025-08-13T15:00:00Z",
  },
];

// --- Reducer function
const usersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user,
      );
    default:
      return state;
  }
};

const UsersProvider = ({ children }) => {
  // Use localStorage hook to persist data
  const [persistedUsers, setPersistedUsers] = useLocalStorage(
    "tickitz:users",
    DEFAULT_USERS,
  );

  // Use reducer for state management
  const [users, dispatch] = useReducer(usersReducer, persistedUsers);

  // Synchronize reducer state with localStorage whenever users change
  useEffect(() => {
    setPersistedUsers(users);
  }, [users]);

  // Enhanced dispatch
  // Added some common operation
  const enhancedDispatch = (action) => {
    switch (action.type) {
      case "ADD_USER":
        // Generate ID if not provided
        if (!action.payload.id) {
          // Max from (user.id and 0)
          const maxId = Math.max(...users.map((user) => parseInt(user.id)), 0);
          action.payload.id = (maxId + 1).toString();
        }

        // Add timestamps if not provided
        if (!action.payload.created_at) {
          action.payload.created_at = new Date().toISOString();
        }
        if (!action.payload.updated_at) {
          action.payload.updated_at = new Date().toISOString();
        }
        break;

      case "UPDATE_USER":
        // When user updated the password, name, etc
        // Update timestamp
        action.payload.updated_at = new Date().toISOString();
        break;
    }

    dispatch(action);
  };

  const contextValue = {
    users,
    dispatch: enhancedDispatch,

    // --- --- Helper functions for common operations
    addUser: (userData) =>
      enhancedDispatch({ type: "ADD_USER", payload: userData }),

    updateUser: (userData) =>
      enhancedDispatch({ type: "UPDATE_USER", payload: userData }),

    findUserByEmail: (email) =>
      users.find((user) => user.email.toLowerCase() === email.toLowerCase()),
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
