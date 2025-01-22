import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { booksApi } from "./booksApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
