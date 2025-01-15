import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  Spinner,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { DetailBookSchema } from "../model/types/detailBookSchema";
import { ReviewList } from "@/entities/ReviewList";
import { useEffect, useState } from "react";
import { fetchBookById } from "@/app/services/api";
import image from "@/shared/assets/images/stack-of-books.jpg";

interface BookDetailsProps {
  bookId: number;
}

export function BookDetails({ bookId }: BookDetailsProps) {
  const [book, setBook] = useState<DetailBookSchema | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchBookById(bookId);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  return (
    <>
      {isLoading && (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
      {book ? (
        <VStack>
          <Stack direction={{ base: "column", md: "row" }} gap="10">
            <Box width={{ base: "100%", md: "40%" }}>
              <Image objectFit="cover" src={book.cover || image} alt="Books" />
              <HStack mt="4" gap="6">
                {book.reviews.length !== 0 && (
                  <Badge>Review: {book.reviews.length}</Badge>
                )}
                {book.rating === 0 ? (
                  <Badge>Not rated yet</Badge>
                ) : (
                  <Badge>Rating: {book.rating.toFixed(2)}</Badge>
                )}
              </HStack>
            </Box>
            <VStack width={{ base: "100%", md: "60%" }}>
              <Heading as="h3" size="2xl" alignSelf="flex-start">
                {book.title}
              </Heading>
              <Heading as="h4" size="lg" alignSelf="flex-start">
                {book.author}
              </Heading>
              <Text maxH="96" overflow="auto">
                {book.content}
              </Text>
            </VStack>
          </Stack>
          <ReviewList reviews={book.reviews} />
        </VStack>
      ) : (
        <Text>No book found ;</Text>
      )}
    </>
  );
}
