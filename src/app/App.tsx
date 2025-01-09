import AddBookForm from "../features/AddBookForm";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <main className="container max-w-6xl mx-auto p-4">
      <Heading as="h1" className="text-4xl text-teal-700 font-bold">
        Library
      </Heading>
      <AddBookForm />
    </main>
  );
}

export default App;
