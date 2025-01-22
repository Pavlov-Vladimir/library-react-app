import { BookAction, DetailBook } from "./entities.types";

export interface BooksSlice {
  selectedBook: DetailBook | null;
  bookAction: BookAction | null;
  isLoading: boolean;
  error?: string;
}
