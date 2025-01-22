import { useGetBooksQuery } from "@/app/store/booksApi";
import { BookCard } from "@/entities/BookCard";
import { API_BOOKS_ENDPOINT } from "@/shared/constants/api";
import { ApiEndpoints } from "@/shared/types/apiTypes";
import { VStack, Spinner, Text, SimpleGrid } from "@chakra-ui/react";

interface BookTabsProps {
  source?: ApiEndpoints;
}

export function BookList({ source = API_BOOKS_ENDPOINT }: BookTabsProps) {
  const { data, error, isLoading } = useGetBooksQuery(source);

  return (
    <>
      {error ? (
        <Text fontSize="lg" color="red.400">
          Something went wrong...
        </Text>
      ) : isLoading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      ) : data?.length ? (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          {data.map((book) => (
            <BookCard key={book.id!} book={book} />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="green.400">
          There are no books yet.
        </Text>
      )}
    </>
  );
}
