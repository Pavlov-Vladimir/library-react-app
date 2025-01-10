import { Badge, Box, Card, HStack, Image, IconButton } from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function BookCard() {
  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      maxW="xl"
      className="border border-gray-300"
    >
      <Image
        objectFit="cover"
        w="25%"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
      <Box w="100%">
        <Card.Body>
          <Card.Title mb="2" className="text-2xl font-bold">
            The perfect book
          </Card.Title>
          <HStack mt="4" gap="8">
            <Badge>Review: {}</Badge>
            <Badge>Rating: {}</Badge>
          </HStack>
        </Card.Body>
      </Box>
      <div className="flex justify-end p-2 space-x-2 w-fit">
        <IconButton
          aria-label="View book"
          className="border border-gray-300 rounded-md transition-colors duration-300 hover:bg-teal-200"
        >
          <IoEyeOutline />
        </IconButton>
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
