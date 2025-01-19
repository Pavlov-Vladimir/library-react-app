import {combineReducers} from "@reduxjs/toolkit";
import books from "./slices/booksSlice/booksSlice";

const rootReducer = combineReducers({
  books: books,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
