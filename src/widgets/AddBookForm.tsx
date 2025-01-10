import {
  Button,
  FileUploadRoot,
  Heading,
  HStack,
  Input,
  Separator,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { FileUploadTrigger } from "../components/ui/file-upload";
import { useState } from "react";

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    cover: null as File | null,
    genre: "",
    author: "",
    content: "",
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      title: "",
      cover: null,
      genre: "",
      author: "",
      content: "",
    });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      cover: null,
      genre: "",
      author: "",
      content: "",
    });
  };

  return (
    <VStack className="p-3 mt-10 mx-auto border border-gray-300 rounded-md">
      <Heading
        as="h2"
        className="text-2xl text-teal-700 font-bold text-left w-full"
      >
        Add Book
      </Heading>
      <Separator className="border-t border-gray-300" />
      <form className="mt-4 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-24 items-center">
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
                className="p-2 border border-gray-300 rounded-md"
              />
            </Field>
            <Field label="Author" orientation="horizontal">
              <Input
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </Field>
          </VStack>
          <div className="h-full">
            <Field
              label="Content"
              orientation="horizontal"
              className="h-full items-start"
            >
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md h-full"
              />
            </Field>
          </div>
        </div>
        <HStack className="justify-center mt-6">
          <Button
            type="submit"
            className="bg-teal-500 text-white font-semibold p-2 rounded-md w-1/6 min-w-20"
          >
            Add
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            className="bg-yellow-500 text-white font-semibold p-2 rounded-md w-1/6 min-w-20"
          >
            Clear
          </Button>
        </HStack>
      </form>
    </VStack>
  );
}
