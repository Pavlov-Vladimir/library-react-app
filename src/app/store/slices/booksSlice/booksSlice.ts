import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookAction } from "../../types/entities.types";
import { BooksSlice } from "../../types/slices.types";
import { fetchBookById, fetchBooksApi } from "@/app/services/api";
import { API_BOOKS_ENDPOINT, API_RECOMMENDED_ENDPOINT } from "@/shared/constants/api";

const initialState: BooksSlice = {
  books: [],
  recommended: [],
  selectedBook: null,
  bookAction: null,
  isLoading: false,
  error: undefined,
};

export const setAllBooks = createAsyncThunk("setAllBooks", async (_, { rejectWithValue }) => {
  try {
    return await fetchBooksApi({ endpoint: API_BOOKS_ENDPOINT });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const setRecommendedBooks = createAsyncThunk(
  "setRecommended",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBooksApi({ endpoint: API_RECOMMENDED_ENDPOINT });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const setSelectedBook = createAsyncThunk(
  "setSelectedBook",
  async (id: number, { rejectWithValue }) => {
    try {
      return await fetchBookById(id);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

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
      });
  },
});

export const { setBookAction, resetSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
