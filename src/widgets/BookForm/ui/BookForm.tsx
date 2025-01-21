import {
  Box,
  Button,
  FileUploadRoot,
  Heading,
  Text,
  HStack,
  Input,
  Separator,
  SimpleGrid,
  Textarea,
  VStack,
  FileUploadLabel,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FileUploadTrigger } from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import { BookFormSchema } from "@/shared/types/apiTypes";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getSelectedBook } from "@/app/store/selectors/books/getSelectedBook";
import { getBookAction } from "@/app/store/selectors/books/getBookAction";
import { resetSelectedBook, setBookAction } from "@/app/store/slices/booksSlice/booksSlice";
import { getBooksError } from "@/app/store/selectors/books/getBooksError";
import { saveBook } from "@/app/store/slices/booksSlice/thunks";

const initialFormData: BookFormSchema = {
  title: "",
  author: "",
  cover: "",
  genre: "",
  content: "",
};

export function BookForm() {
  const [formData, setFormData] = useState<BookFormSchema>({
    ...initialFormData,
  });
  const [fileName, setFileName] = useState<string>("");

  const dispatch = useAppDispatch();

  const error = useAppSelector(getBooksError);
  const selectedBook = useAppSelector(getSelectedBook);
  const bookAction = useAppSelector(getBookAction);
  const formAction = bookAction === "edit" ? "Edit" : "Add";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        cover: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveBook(formData));
    setFormData({ ...initialFormData });
    setFileName("");
    if (error) {
      toaster.error({
        title: "Error saving book",
        description: "An error occurred while saving the book",
      });
    } else {
      toaster.success({
        title: "Book saved",
        description: `Book "${formData.title}" has been saved successfully`,
      });
    }
  };

  const handleClear = () => {
    dispatch(resetSelectedBook());
    dispatch(setBookAction(null));
    setFileName("");
  };

  useEffect(() => {
    if (selectedBook && bookAction === "edit") {
      setFormData({
        id: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        cover: selectedBook.cover ?? "",
        genre: selectedBook.genre,
        content: selectedBook.content,
      });
    } else {
      setFormData({ ...initialFormData });
    }
  }, [selectedBook, bookAction]);

  return (
    <VStack
      p="3"
      mt="10"
      mx="auto"
      borderWidth="1px"
      borderColor="gray.muted"
      rounded="md"
      bg="gray.100/50"
    >
      <Heading as="h2" color={"teal.700"} fontWeight="bold" size="2xl" textAlign="left" w="full">
        {formAction} Book
      </Heading>
      <Separator />
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Box w="full" mt="4">
          <SimpleGrid columns={[1, null, 2]} gapX="14" gapY="2">
            <VStack className="">
              <Field required label="Title" orientation={{ base: "vertical", sm: "horizontal" }}>
                <Input
                  name="title"
                  type="text"
                  bg="white"
                  shadow="sm"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Field>
              <Field label="Cover" orientation={{ base: "vertical", sm: "horizontal" }}>
                <FileUploadRoot
                  border="1px solid"
                  borderColor="gray.muted"
                  rounded="md"
                  bg="white"
                  shadow="sm"
                >
                  <FileUploadTrigger asChild>
                    <FileUploadLabel
                      htmlFor="file-upload"
                      w="full"
                      p="2"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      fontWeight="400"
                      cursor="pointer"
                    >
                      {fileName && (
                        <Text
                          as="span"
                          display="inline-block"
                          maxW="36"
                          pr="2"
                          overflow="hidden"
                          truncate
                        >
                          {fileName}
                        </Text>
                      )}
                      <Text
                        as="span"
                        pl="4"
                        pr="2"
                        display="inline-flex"
                        borderLeft="1px solid"
                        borderColor="gray.muted"
                        ml="auto"
                      >
                        Choose...
                        <input
                          hidden
                          id="file-upload"
                          onChange={handleFileChange}
                          type="file"
                          accept="image/*"
                        />
                      </Text>
                    </FileUploadLabel>
                  </FileUploadTrigger>
                </FileUploadRoot>
              </Field>

              <Field required label="Genre" orientation={{ base: "vertical", sm: "horizontal" }}>
                <Input
                  name="genre"
                  type="text"
                  value={formData.genre}
                  onChange={handleChange}
                  bg="white"
                  shadow="sm"
                />
              </Field>
              <Field required label="Author" orientation={{ base: "vertical", sm: "horizontal" }}>
                <Input
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  bg="white"
                  shadow="sm"
                />
              </Field>
            </VStack>
            <Box h="full">
              <Field
                required
                h="full"
                label="Content"
                orientation={{ base: "vertical", sm: "horizontal" }}
                alignItems="flex-start"
              >
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  h="full"
                  minH="32"
                  bg="white"
                  shadow="sm"
                />
              </Field>
            </Box>
          </SimpleGrid>
          <HStack justify="center" mt="6" justifyItems="center" spaceX={{ base: "2", sm: "4" }}>
            <Button type="submit" w="1/6" minW="20" colorPalette="green" variant="surface">
              {formAction}
            </Button>
            <Button
              onClick={handleClear}
              type="button"
              w="1/6"
              minW="20"
              colorPalette="yellow"
              variant="surface"
            >
              Clear
            </Button>
          </HStack>
        </Box>
      </form>
    </VStack>
  );
}
