import { API_BOOKS_ENDPOINT, API_RECOMMENDED_ENDPOINT } from "../constants/api";

export type ApiEndpoints = {
  endpoint: typeof API_BOOKS_ENDPOINT | typeof API_RECOMMENDED_ENDPOINT;
};

export type BookFormSchema = {
  id?: number;
  title: string;
  cover: string;
  genre: string;
  author: string;
  content: string;
};
