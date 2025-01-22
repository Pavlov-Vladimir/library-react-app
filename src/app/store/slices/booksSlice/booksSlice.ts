import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookAction } from "../../types/entities.types";
import { BooksSlice } from "../../types/slices.types";
import { setSelectedBook } from "./thunks";

const initialState: BooksSlice = {
  selectedBook: null,
  bookAction: null,
  isLoading: false,
  error: undefined,
};

const handlePending = (state: BooksSlice) => {
  state.isLoading = true;
  state.error = undefined;
};

const handleFulfilled = <T>(state: BooksSlice, action: PayloadAction<T>) => {
  state.isLoading = false;
  state.error = undefined;
  return action.payload;
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBookAction(state, action: PayloadAction<BookAction | null>) {
      state.bookAction = action.payload;
    },
    resetSelectedBook(state) {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedBook.pending, handlePending)
      .addCase(setSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = handleFulfilled(state, action);
      })
      .addCase(setSelectedBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setBookAction, resetSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
