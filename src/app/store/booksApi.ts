import { API_BOOKS_ENDPOINT, API_URL } from "@/shared/constants/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "./types/entities.types";
import { ApiEndpoints, BookFormSchema } from "@/shared/types/apiTypes";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], ApiEndpoints | undefined>({
      query: (endpoint = API_BOOKS_ENDPOINT) => endpoint,
      providesTags: ["Books"],
    }),
    getBookById: builder.query<Book, number>({
      query: (id) => `${API_BOOKS_ENDPOINT}/${id}`,
    }),
    saveBook: builder.mutation<number, BookFormSchema>({
      query: (book) => ({
        url: `${API_BOOKS_ENDPOINT}/save`,
        method: "POST",
        body: book,
      }),

      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useSaveBookMutation } = booksApi;
