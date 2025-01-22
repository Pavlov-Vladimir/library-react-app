import { fetchBookById } from "@/app/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const setSelectedBook = createAsyncThunk(
  "books/setSelectedBook",
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
