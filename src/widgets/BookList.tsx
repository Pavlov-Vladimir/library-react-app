import { fetchBooks } from "@/app/services/api";
import { BookSchema, BookCard } from "@/entities/BookCard";
import { API_BOOKS_ENDPOINT } from "@/shared/constants/api";
import { ApiEndpoints } from "@/shared/types/api";
import { useState, useEffect } from "react";

type BookTabsProps = Partial<ApiEndpoints>;

export default function BookList({ endpoint = API_BOOKS_ENDPOINT }: BookTabsProps) {
  const [books, setBooks] = useState<BookSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks({ endpoint });
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };
    fetchData();
  }, [endpoint]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {books.map((book, index) => (
        <BookCard
          key={index}
          id={book.id}
          title={book.title}
          rating={book.rating}
          reviewsNumber={book.reviewsNumber}
        />
      ))}
    </div>
  );
}
