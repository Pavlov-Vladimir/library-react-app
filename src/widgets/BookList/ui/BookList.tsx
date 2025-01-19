import { useAppDispatch } from "@/app/store/hooks";
import { getAllBooks } from "@/app/store/selectors/books/getAllBooks";
import { getBooksIsLoading } from "@/app/store/selectors/books/getBooksIsLoading";
import { getRecommendedBooks } from "@/app/store/selectors/books/getRecommendedBooks";
import { setAllBooks, setRecommendedBooks } from "@/app/store/slices/booksSlice/booksSlice";
import { BookCard } from "@/entities/BookCard";
import { VStack, Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface BookTabsProps {
  filter: "all" | "recommended";
}

export function BookList({ filter }: BookTabsProps) {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getBooksIsLoading);
  const selectorFn = filter === "recommended" ? getRecommendedBooks : getAllBooks;
  const setDataFn = filter === "recommended" ? setRecommendedBooks : setAllBooks;
  const books = useSelector(selectorFn);

  useEffect(() => {
    dispatch(setDataFn());
  }, [dispatch, setDataFn]);

  return (
    <>
      {isLoading && !books.length && (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap="4"
      >
        {books?.map((book) => (
          <BookCard
            key={book.id!}
            book={book}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
