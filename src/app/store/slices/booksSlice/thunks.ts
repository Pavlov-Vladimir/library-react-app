import { fetchBooksApi, fetchBookById } from "@/app/services/api";
import { API_BOOKS_ENDPOINT, API_RECOMMENDED_ENDPOINT, API_URL } from "@/shared/constants/api";
import { BookFormSchema } from "@/shared/types/apiTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Book } from "../../types/entities.types";
import { BooksSlice } from "../../types/slices.types";

export const setAllBooks = createAsyncThunk("books/setAllBooks", async (_, { rejectWithValue }) => {
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
  "books/setRecommended",
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

type ResponseType = {
  id: number;
};

export const saveBook = createAsyncThunk<
  Book,
  BookFormSchema,
  { rejectValue: string; state: { books: BooksSlice } }
>("books/saveBook", async (book, { rejectWithValue, getState }) => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.post(
      `${API_URL}${API_BOOKS_ENDPOINT}/save`,
      book
    );
    if (response.status !== 200 && response.status !== 201) {
      return rejectWithValue("Server error occurred");
    }

    let savedBook = getState().books.books.find((book) => book.id === response.data.id);

    if (!savedBook && response.status === 201) {
      savedBook = {
        id: response.data.id,
        title: book.title,
        author: book.author,
        rating: 0,
        reviewsNumber: 0,
      };

      return savedBook;
    } else if (savedBook && response.status === 200) {
      savedBook = {
        ...savedBook,
        title: book.title,
        author: book.author,
      };
      return savedBook;
    } else {
      return rejectWithValue("UNKNOWN error");
    }
  } catch (error) {
    return rejectWithValue("Server error occurred");
  }
});
