import { HistoryContext } from "./historyContext";

// --- Use custom hook
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useReducer } from "react";

// --- Default history data
const DEFAULT_HISTORY = [
  {
    // Create orderId
    // Add 1 from latest orderId
    orderId: 0,

    // userId who buys the ticket
    userId: null,

    // From movie slice
    movieId: null,
    originalTitle: null,
    cat: null, // PG-13

    // From order slice
    date: null,
    time: null,
    cityLocation: null,
    cinema: null,
    seats: null,
    virtualAccount: null,
    paymentDue: null, // 1 day from payment is created
    totalPayment: null,
    ticketStatus: {
      isActive: null,
      isPaid: null,
    },
  },
];

// --- Reducer function
const historyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, action.payload];
    case "UPDATE_ORDER":
      return state.map((order) =>
        order.id === action.payload.orderId
          ? { ...order, ...action.payload }
          : order,
      );
    default:
      return state;
  }
};

const HistoryProvider = ({ children }) => {
  // Use localStorage hook to persist data
  const [persistedHistory, setPersistedHistory] = useLocalStorage(
    "tickitz:history",
    DEFAULT_HISTORY,
  );

  // Use reducer for state management
  const [history, dispatch] = useReducer(historyReducer, persistedHistory);

  // Synchronize reducer state with localStorage whenever history changes
  useEffect(() => {
    setPersistedHistory(history);
  }, [history]);

  // Enhanced dispatch
  // Add some common operation
  const enhancedDispatch = (action) => {
    switch (action.type) {
    }
  };
};
