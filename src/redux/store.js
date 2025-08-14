import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slice
import movieReducer from "./slice/movieSlice";
import orderReducer from "./slice/orderSlice";
import historyReducer from "./slice/historySlice";
import loggedInReducer from "./slice/loggedInSlice";

import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
  PURGE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "tickitz:redux",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    loggedIn: loggedInReducer,
    movie: movieReducer,
    order: orderReducer,
    history: historyReducer,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      },
    });
  },
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
});

export const persistedStore = persistStore(store);
export default store;
