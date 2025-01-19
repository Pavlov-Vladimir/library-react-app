import { Box, Heading, Text, Image, Stack, VStack, Spinner, HStack, Badge } from "@chakra-ui/react";
import { ReviewList } from "@/entities/ReviewList";
import image from "@/shared/assets/images/stack-of-books.jpg";
import { useSelector } from "react-redux";
import { getSelectedBook } from "@/app/store/selectors/books/getSelectedBook";
import { getBooksIsLoading } from "@/app/store/selectors/books/getBooksIsLoading";

export function BookDetails() {
  const book = useSelector(getSelectedBook);
  const isLoading = useSelector(getBooksIsLoading);

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
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="10"
          >
            <Box width={{ base: "100%", md: "40%" }}>
              <Image
                objectFit="cover"
                src={book.cover || image}
                alt="Books"
              />
              <HStack
                mt="4"
                gap="6"
              >
                {book.reviews.length !== 0 && <Badge>Review: {book.reviews.length}</Badge>}
                {book.rating === 0 ? (
                  <Badge>Not rated yet</Badge>
                ) : (
                  <Badge>Rating: {book.rating.toFixed(2)}</Badge>
                )}
              </HStack>
            </Box>
            <VStack
              width={{ base: "100%", md: "60%" }}
              alignItems="flex-start"
            >
              <Heading
                as="h3"
                size="3xl"
                color={"teal.700"}
                fontWeight={700}
              >
                {book.title}
              </Heading>
              <Heading
                as="h4"
                size="lg"
                color="gray.600"
              >
                {book.author}, {book.genre}
              </Heading>
              <Text
                maxH="96"
                overflow="auto"
              >
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
