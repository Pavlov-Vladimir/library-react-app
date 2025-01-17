import { combineReducers } from "@reduxjs/toolkit";
import { reducer } from "./slices/booksSlice/booksSlice";

const rootReducer = combineReducers({
  books: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
