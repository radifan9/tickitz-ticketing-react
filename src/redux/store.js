import { combineReducers, configureStore } from "@reduxjs/toolkit";

//
import movieReducer from "./slice/movieSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
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
    movie: movieReducer,
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
