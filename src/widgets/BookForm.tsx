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
import { useState } from "react";
import { BookFormSchema } from "@/shared/types/apiTypes";
import { saveBook } from "@/app/services/api";

const initialFormData: BookFormSchema = {
  title: "",
  author: "",
  cover: "",
  genre: "",
  content: "",
};

export default function BookForm() {
  const [formData, setFormData] = useState<BookFormSchema>({
    ...initialFormData,
  });
  const [fileName, setFileName] = useState<string>("");
  const [savedBookId, setSavedBookId] = useState<number | undefined>(undefined);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
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
      console.log(base64String);
      setFormData((prev) => ({
        ...prev,
        cover: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postBook = async () => {
      console.log(formData);
      try {
        const savedBookId = await saveBook(formData);
        setSavedBookId(savedBookId);
      } catch (error) {
        console.error("Error saving book:", error);
        setSavedBookId(-1);
      } finally {
        setFormData({ ...initialFormData });
        setFileName("");
        setSavedBookId(undefined);
      }
    };
    postBook();
  };

  const handleClear = () => {
    setFileName("");
    setSavedBookId(undefined);
    setFormData({ ...initialFormData });
  };

  return (
    <VStack
      p="3"
      mt="10"
      mx="auto"
      borderWidth="1px"
      borderColor="gray.muted"
      rounded="md"
    >
      <Heading
        as="h2"
        color={"teal.700"}
        fontWeight="bold"
        size="2xl"
        textAlign="left"
        w="full"
      >
        Add Book
      </Heading>
      <Separator />
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Box w="full" mt="4">
          <SimpleGrid
            columns={[1, null, 2]}
            gapX={{ base: "14", lg: "24" }}
            gapY="2"
          >
            <VStack className="">
              <Field
                required
                label="Title"
                orientation={{ base: "vertical", sm: "horizontal" }}
              >
                <Input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Field>
              <Field
                label="Cover"
                orientation={{ base: "vertical", sm: "horizontal" }}
              >
                <FileUploadRoot
                  border="1px solid"
                  borderColor="gray.muted"
                  rounded="md"
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

              <Field
                required
                label="Genre"
                orientation={{ base: "vertical", sm: "horizontal" }}
              >
                <Input
                  name="genre"
                  type="text"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </Field>
              <Field
                required
                label="Author"
                orientation={{ base: "vertical", sm: "horizontal" }}
              >
                <Input
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
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
                />
              </Field>
            </Box>
          </SimpleGrid>
          <HStack
            justify="center"
            mt="6"
            justifyItems="center"
            spaceX={{ base: "2", sm: "4" }}
          >
            <Button
              type="submit"
              w="1/6"
              minW="20"
              colorPalette="green"
              variant="surface"
            >
              Add
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
