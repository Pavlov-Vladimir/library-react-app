import { Book, BookAction, DetailBook } from "./entities.types";

export interface BooksSlice {
  books: Book[];
  recommended: Book[];
  selectedBook: DetailBook | null;
  bookAction: BookAction | null;
  isLoading: boolean;
  error?: string;
}
