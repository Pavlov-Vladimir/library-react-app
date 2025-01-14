import {BookSchema} from "@/entities/BookCard";
import { DetailBookSchema } from "@/entities/BookDetails";
import {API_BOOKS_ENDPOINT, API_URL} from "@/shared/constants/api";
import {ApiEndpoints} from "@/shared/types/api";
import axios, {AxiosResponse} from "axios";

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

export const fetchBookById = async (id: number): Promise<DetailBookSchema | null> => {
  if (id <= 0) {
    return null;
  }
  try {
    const response: AxiosResponse<DetailBookSchema> = await axios.get<DetailBookSchema>(`${API_URL}${API_BOOKS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}