import { Tabs } from "@chakra-ui/react";
import BookList from "./BookList";
import { API_RECOMMENDED_ENDPOINT } from "@/shared/constants/api";

interface BookTabsProps {
  selectBook: (id: number) => void;
}

export default function BookTabs({ selectBook }: BookTabsProps) {
  return (
    <Tabs.Root mt="10" defaultValue="all" variant="outline">
      <Tabs.List>
        <Tabs.Trigger value="all" px="4" py="2">
          All
        </Tabs.Trigger>
        <Tabs.Trigger value="recommended" px="4" py="2">
          Recommended
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value="all"
        p="4"
        borderWidth="1px"
        borderColor="gray.muited"
        borderTopColor="transparent"
        h="96"
        overflowY="auto"
      >
        <BookList selectBook={selectBook} />
      </Tabs.Content>
      <Tabs.Content
        value="recommended"
        p="4"
        borderColor="gray.muted"
        borderWidth="1px"
        borderTopColor="transparent"
        h="96"
        overflowY="auto"
      >
        <BookList endpoint={API_RECOMMENDED_ENDPOINT} selectBook={selectBook} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
