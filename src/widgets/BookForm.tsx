import {
  Box,
  Button,
  FileUploadRoot,
  Heading,
  HStack,
  Input,
  Separator,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FileUploadTrigger } from "@/components/ui/file-upload";
import { useState } from "react";

interface FormData {
  title: string;
  author: string;
  cover: File | null;
  genre: string;
  content: string;
}

const initialFormData: FormData = {
  title: "",
  author: "",
  cover: null,
  genre: "",
  content: "",
};

export default function BookForm() {
  const [formData, setFormData] = useState({ ...initialFormData });

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
    setFormData((prev) => ({
      ...prev,
      cover: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({ ...initialFormData });
  };

  const handleClear = () => {
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
      <Box as="form" w="full" mt="4">
        <SimpleGrid columns={[1, null, 2]} gap="24">
          <VStack className="">
            <Field label="Title" orientation="horizontal">
              <Input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </Field>
            <Field label="Cover" orientation="horizontal">
              <FileUploadRoot>
                <FileUploadTrigger
                  asChild
                  className="w-full border border-gray-300 rounded-md"
                >
                  <label
                    htmlFor="file-upload"
                    className="w-full h-full flex items-center cursor-pointer"
                  >
                    {formData.cover && (
                      <span className="p-2">{formData.cover.name}</span>
                    )}
                    <span className="inline-flex ml-auto px-6 py-2 border-l border-gray-300 h-full items-center">
                      Choose...
                      <input
                        id="file-upload"
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </span>
                  </label>
                </FileUploadTrigger>
              </FileUploadRoot>
            </Field>

            <Field label="Genre" orientation="horizontal">
              <Input
                name="genre"
                type="text"
                value={formData.genre}
                onChange={handleChange}
              />
            </Field>
            <Field label="Author" orientation="horizontal">
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
              h="full"
              label="Content"
              orientation="horizontal"
              alignItems="flex-start"
            >
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                h="full"
              />
            </Field>
          </Box>
        </SimpleGrid>
        <HStack justify="center" mt="6" className="justify-center mt-6">
          <Button
            onClick={handleSubmit}
            type="button"
            bgColor={"teal.500"}
            w="1/6"
            minW="20"
            className="bg-teal-500 text-white font-semibold p-2 rounded-md w-1/6 min-w-20"
          >
            Add
          </Button>
          <Button
            onClick={handleClear}
            type="button"
            bgColor={"yellow.500"}
            w="1/6"
            minW="20"
            className="bg-yellow-500 text-white font-semibold p-2 rounded-md w-1/6 min-w-20"
          >
            Clear
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}
