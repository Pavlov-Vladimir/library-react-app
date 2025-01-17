import { Book } from "./entities";

export interface BooksSlice {
    books: Book[];
    selectedBookId?: number; 
}