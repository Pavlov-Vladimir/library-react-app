import {Tabs} from "@chakra-ui/react";
import BookList from "./BookList";
import { API_RECOMMENDED_ENDPOINT } from "@/shared/constants/api";

export default function BookTabs() {
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
        <BookList />
      </Tabs.Content>
      <Tabs.Content
        value="recommended"
        className="p-4 border border-gray-300 max-h-96 overflow-y-auto">
        <BookList endpoint={API_RECOMMENDED_ENDPOINT} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
