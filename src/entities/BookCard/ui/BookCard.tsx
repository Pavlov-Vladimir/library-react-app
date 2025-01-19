import { Badge, Box, Card, Image, IconButton, Flex } from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import image from "@/shared/assets/images/stack-of-books.jpg";
import { Book, BookAction } from "@/app/store/types/entities.types";
import { useAppDispatch } from "@/app/store/hooks";
import { setBookAction, setSelectedBook } from "@/app/store/slices/booksSlice/booksSlice";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { id, title, rating, reviewsNumber } = book;

  const dispatch = useAppDispatch();

  const onSelectBook = (id: number, action: BookAction) => {
    dispatch(setSelectedBook(id));
    dispatch(setBookAction(action));
  };

  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      maxW="xl"
      mx="auto"
      shadow="sm"
    >
      <Box
        w="25%"
        h="100%"
      >
        <Image
          src={image}
          objectFit="cover"
          alt="Books"
        />
      </Box>
      <Flex
        w="75%"
        wrap="wrap"
      >
        <Card.Body
          flexGrow="1"
          p={{ base: "2", md: "4", lg: "6" }}
          minW="44"
        >
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
        <Flex
          gap="2"
          p="2"
          justify="flex-end"
          ml="auto"
        >
          <IconButton
            onClick={() => onSelectBook(id!, "view")}
            aria-label="View book"
            colorPalette="green"
            variant="surface"
            size={{ base: "xs", sm: "sm", md: "md" }}
          >
            <IoEyeOutline />
          </IconButton>
          <IconButton
            onClick={() => onSelectBook(id!, "edit")}
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
