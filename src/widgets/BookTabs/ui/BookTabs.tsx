import { Tabs } from "@chakra-ui/react";
import { BookList } from "@/widgets/BookList";

export function BookTabs() {
  return (
    <Tabs.Root
      mt="10"
      defaultValue="all"
      variant="outline"
    >
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
        borderColor="gray.muted"
        borderTopColor="transparent"
        h="96"
        overflowY="auto"
        bg="gray.100/50"
        shadow="sm"
      >
        <BookList filter="all" />
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
        <BookList filter="recommended" />
      </Tabs.Content>
    </Tabs.Root>
  );
}
