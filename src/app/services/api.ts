import {BookSchema} from "@/entities/BookCard";
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
