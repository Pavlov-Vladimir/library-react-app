import BookTabs from "../widgets/BookTabs";
import BookForm from "../widgets/BookForm";
import { Container, Heading } from "@chakra-ui/react";
import { Modal } from "@/shared/ui/Modal";
import { BookDetails } from "@/entities/BookDetails";
import { useState } from "react";

function App() {
  const [selectedBookId, setSelectedBookId] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelectBook(bookId: number) {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedBookId(-1);
  }

  return (
    <main>
      <Container maxW="6xl" p="4">
        <Heading as="h1" size="4xl" fontWeight={700} mb="4" color={"teal.700"}>
          Library
        </Heading>
        <BookForm />
        <BookTabs selectBook={handleSelectBook} />
      </Container>

      <Modal isOpen={isModalOpen} onModalClose={handleCloseModal}>
        <BookDetails bookId={selectedBookId} />
      </Modal>
    </main>
  );
}

export default App;
