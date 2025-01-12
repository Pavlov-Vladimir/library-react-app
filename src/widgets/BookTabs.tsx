import {Tabs} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {fetchBooks} from "../app/services/api";
import {BookSchema} from "@/entities/BookCard/model/types/bookSchema";
import {BookCard} from "@/entities/BookCard";
import {ApiEndpoints} from "@/shared/types/api";

type BookTabsProps = ApiEndpoints;

export default function BookTabs({endpoint}: BookTabsProps) {
  const [books, setBooks] = useState<BookSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks({endpoint});
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };
    fetchData();
  }, [endpoint]);

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
      <Tabs.Content value="all" className="p-4 border border-gray-300 max-h-96 overflow-y-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              rating={book.rating}
              reviewsNumber={book.reviewsNumber}
            />
          ))}
        </div>
      </Tabs.Content>
      <Tabs.Content
        value="recommended"
        className="p-4 border border-gray-300 max-h-96 overflow-y-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              rating={book.rating}
              reviewsNumber={book.reviewsNumber}
            />
          ))}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
