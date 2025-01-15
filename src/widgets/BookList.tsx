import { fetchBooks } from "@/app/services/api";
import { BookSchema, BookCard } from "@/entities/BookCard";
import { API_BOOKS_ENDPOINT } from "@/shared/constants/api";
import { ApiEndpoints } from "@/shared/types/apiTypes";
import { VStack, Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type BookTabsProps = Partial<ApiEndpoints> & {
  selectBook: (bookId: number) => void;
};

export default function BookList({
  endpoint = API_BOOKS_ENDPOINT,
  selectBook,
}: BookTabsProps) {
  const [books, setBooks] = useState<BookSchema[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBooks({ endpoint });
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return (
    <>
      {isLoading && (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
        {books.map((book, index) => (
          <BookCard
            key={index}
            id={book.id}
            title={book.title}
            cover={book.cover}
            rating={book.rating}
            reviewsNumber={book.reviewsNumber}
            selectBook={selectBook}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
