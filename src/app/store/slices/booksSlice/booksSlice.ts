import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/entities";
import { BooksSlice } from "../../types/slices";

const initialState: BooksSlice = {
  books: [],
  selectedBookId: undefined,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks(state, action: PayloadAction<Book[]>) {},
    // saveBook(state, action: PayloadAction<number | null | undefined>) {},
    // selectBook(state, action: PayloadAction<number | null | undefined>) {},
  },
});

export const { getBooks } = booksSlice.actions;
export const { reducer } = booksSlice;
