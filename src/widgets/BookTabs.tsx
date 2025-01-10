import { Tabs } from "@chakra-ui/react";
import BookCard from "../entities/BookCard";
import { useEffect, useState } from "react";
import { fetchBooks } from "../app/services/fetchBooks";

export default function BookTabs() {
  const [BookTabs, setBookTabs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchBooks();
    };
    fetchData();
  }, []);

  return (
    <Tabs.Root defaultValue="all" variant="line" className="mt-10">
      <Tabs.List>
        <Tabs.Trigger value="all" className="px-4 py-2">
          All
        </Tabs.Trigger>
        <Tabs.Trigger value="recommended" className="px-4 py-2">
          Recommended
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value="all"
        className="p-4 border border-gray-300 max-h-96 overflow-y-auto"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <BookCard key={index} />
          ))}
        </div>
      </Tabs.Content>
      <Tabs.Content
        value="recommended"
        className="p-4 border border-gray-300 max-h-96 overflow-y-auto"
      >
        Manage your projects
      </Tabs.Content>
    </Tabs.Root>
  );
}
