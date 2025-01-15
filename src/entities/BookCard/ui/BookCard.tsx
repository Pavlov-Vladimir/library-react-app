import { Badge, Box, Card, Image, IconButton, Flex } from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import image from "@/shared/assets/images/stack-of-books.jpg";

interface BookCardProps {
  id: number;
  title: string;
  cover: string;
  rating: number;
  reviewsNumber: number;
  selectBook: (bookId: number) => void;
}

export function BookCard(props: BookCardProps) {
  const { id, title, cover, rating, reviewsNumber, selectBook } = props;

  console.log(cover);

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl" mx="auto">
      <Box w="25%" h="100%">
        <Image objectFit="cover" alt="Books" src={cover || image} />
      </Box>
      <Flex w="75%" wrap="wrap">
        <Card.Body flexGrow="1" p={{ base: "2", md: "4", lg: "6" }} minW="44">
          <Card.Title mb={{ md: "2" }}>{title}</Card.Title>
          <Flex
            mt={{ base: "2", md: "4" }}
            gapX={{ base: "3", sm: "6" }}
            gapY="2"
            wrap="wrap"
          >
            {reviewsNumber != 0 && <Badge>Review: {reviewsNumber}</Badge>}
            {rating === 0 ? (
              <Badge>Not rated yet</Badge>
            ) : (
              <Badge>Rating: {rating.toFixed(2)}</Badge>
            )}
          </Flex>
        </Card.Body>
        <Flex gap="2" p="2" justify="flex-end" ml="auto">
          <IconButton
            onClick={() => selectBook(id)}
            aria-label="View book"
            colorPalette="green"
            variant="surface"
            size={{ base: "xs", sm: "sm", md: "md" }}
          >
            <IoEyeOutline />
          </IconButton>
          <IconButton
            aria-label="Edit book"
            colorPalette="yellow"
            variant="surface"
            size={{ base: "xs", sm: "sm", md: "md" }}
          >
            <AiOutlineEdit />
          </IconButton>
        </Flex>
      </Flex>
    </Card.Root>
  );
}
