import { combineReducers } from "@reduxjs/toolkit";
import books from "./slices/booksSlice/booksSlice";
import { booksApi } from "./booksApi";

const rootReducer = combineReducers({
  books: books,
  [booksApi.reducerPath]: booksApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
