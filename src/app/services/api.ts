import { BookSchema } from "@/entities/BookCard";
import { DetailBookSchema } from "@/entities/BookDetails";
import { API_BOOKS_ENDPOINT, API_URL } from "@/shared/constants/api";
import { ApiEndpoints, BookFormSchema } from "@/shared/types/apiTypes";
import axios, { AxiosResponse } from "axios";
import { Book, DetailBook } from "@/app/store/types/entities.types";

export const fetchBooks = async ({
  endpoint = API_BOOKS_ENDPOINT,
}: ApiEndpoints): Promise<BookSchema[]> => {
  try {
    const response: AxiosResponse<BookSchema[]> = await axios.get<BookSchema[]>(API_URL + endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchBooksApi = async ({ endpoint }: ApiEndpoints): Promise<Book[]> => {
  try {
    const response: AxiosResponse<Book[]> = await axios.get<Book[]>(API_URL + endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Fetching error: ${error}`);
    return [];
  }
};

// export const fetchAllBooks = async (): Promise<Book[]> => {
//   try {
//     const response: AxiosResponse<Book[]> = await axios.get<Book[]>(API_URL + API_BOOKS_ENDPOINT);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const fetchRecommendedBooks = async (): Promise<Book[]> => {
//   try {
//     const response: AxiosResponse<Book[]> = await axios.get<Book[]>(
//       API_URL + API_RECOMMENDED_ENDPOINT
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export const fetchBookById = async (id: number): Promise<DetailBook | null> => {
  if (id <= 0) {
    return null;
  }
  try {
    const response: AxiosResponse<DetailBook> = await axios.get<DetailBook>(
      `${API_URL}${API_BOOKS_ENDPOINT}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveBook = async (book: BookFormSchema): Promise<number> => {
  try {
    const response: AxiosResponse<number> = await axios.post(
      `${API_URL}${API_BOOKS_ENDPOINT}/save`,
      book
    );
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Error saving book");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return -1;
  }
};
