import {
  Badge,
  Box,
  Card,
  HStack,
  Image,
  IconButton,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Modal } from "@/shared/ui/Modal";

interface BookCardProps {
  id: number;
  title: string;
  rating: number;
  reviewsNumber: number;
}

export function BookCard(props: BookCardProps) {
  const { id, title, rating, reviewsNumber } = props;

  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      maxW="xl"
      className="border border-gray-300 mx-auto"
    >
      <Image
        objectFit="cover"
        w="25%"
        src="https://st.depositphotos.com/1741875/1237/i/450/depositphotos_12376845-stock-photo-stack-of-old-books.jpg"
        alt="Books"
      />
      <Box w="100%">
        <Card.Body>
          <Card.Title mb="2" className="text-2xl font-bold">
            {title}
          </Card.Title>
          <HStack mt="4" gap="6">
            {reviewsNumber != 0 && <Badge>Review: {reviewsNumber}</Badge>}
            {rating === 0 ? (
              <Badge>Not rated yet</Badge>
            ) : (
              <Badge>Rating: {rating.toFixed(2)}</Badge>
            )}
          </HStack>
        </Card.Body>
      </Box>
      <div className="flex flex-col sm:flex-row p-2 gap-2 w-fit">
        <IconButton
          aria-label="View book"
          className="border border-gray-300 rounded-md transition-colors duration-300 hover:bg-teal-100"
        >
          <IoEyeOutline />
        </IconButton>
        <Modal />

        <IconButton
          aria-label="Edit book"
          className="border border-gray-300 rounded-md transition-colors duration-300 hover:bg-yellow-200"
        >
          <CiEdit />
        </IconButton>
      </div>
    </Card.Root>
  );
}
