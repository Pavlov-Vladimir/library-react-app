import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookAction } from "../../types/entities.types";
import { BooksSlice } from "../../types/slices.types";
import { saveBook, setAllBooks, setRecommendedBooks, setSelectedBook } from "./thunks";

const initialState: BooksSlice = {
  books: [],
  recommended: [],
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
      .addCase(setAllBooks.pending, handlePending)
      .addCase(setAllBooks.fulfilled, (state, action) => {
        state.books = handleFulfilled(state, action);
      })
      .addCase(setAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setRecommendedBooks.pending, handlePending)
      .addCase(setRecommendedBooks.fulfilled, (state, action) => {
        state.recommended = handleFulfilled(state, action);
      })
      .addCase(setRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setSelectedBook.pending, handlePending)
      .addCase(setSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = handleFulfilled(state, action);
      })
      .addCase(setSelectedBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(saveBook.fulfilled, (state, action) => {
        if (state.bookAction !== "edit") {
          state.books.push(action.payload);
        } else {
          const founded = state.books.find((b) => b.id === action.payload.id);
          if (founded) {
            founded.author = action.payload.author;
            founded.title = action.payload.title;
          }
        }
        state.isLoading = false;
        state.error = undefined;
        state.bookAction = null;
      })
      .addCase(saveBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setBookAction, resetSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
