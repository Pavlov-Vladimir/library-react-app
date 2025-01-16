import { Tabs } from "@chakra-ui/react";
import { API_RECOMMENDED_ENDPOINT } from "@/shared/constants/api";
import { ACTION_TRIGGER_TYPE } from "@/shared/constants/common";
import { BookList } from "@/widgets/BookList";

interface BookTabsProps {
  selectBook: (id: number, action: ACTION_TRIGGER_TYPE) => void;
}

export function BookTabs({ selectBook }: BookTabsProps) {
  return (
    <Tabs.Root mt="10" defaultValue="all" variant="outline">
      <Tabs.List colorPalette="green">
        <Tabs.Trigger
          value="all"
          px="4"
          py="2"
          _selected={{ bg: "gray.100/50" }}
        >
          All
        </Tabs.Trigger>
        <Tabs.Trigger
          value="recommended"
          px="4"
          py="2"
          _selected={{ bg: "gray.100/50" }}
        >
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
        bg="gray.100/50"
        shadow="sm"
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
        bg="gray.100/50"
        shadow="sm"
      >
        <BookList endpoint={API_RECOMMENDED_ENDPOINT} selectBook={selectBook} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
