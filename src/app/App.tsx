import { Container, Heading } from "@chakra-ui/react";
import { Modal } from "@/shared/ui/Modal";
import { BookDetails } from "@/entities/BookDetails";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ACTION_TRIGGER_TYPE } from "@/shared/constants/common";
import { BookForm } from "@/widgets/BookForm";
import { BookTabs } from "@/widgets/BookTabs";

function App() {
  const [selectedBookId, setSelectedBookId] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAction, setFormAction] = useState<ACTION_TRIGGER_TYPE>(
    ACTION_TRIGGER_TYPE.ADD
  );

  function handleSelectBook(
    bookId: number,
    action: ACTION_TRIGGER_TYPE = ACTION_TRIGGER_TYPE.ADD
  ) {
    setSelectedBookId(bookId);
    setFormAction(action);
    if (action === ACTION_TRIGGER_TYPE.ADD) {
      setIsModalOpen(true);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedBookId(-1);
  }

  function resetFormAction() {
    setFormAction(ACTION_TRIGGER_TYPE.ADD);
  }

  return (
    <main>
      <Container maxW="6xl" p="4">
        <Heading as="h1" size="4xl" fontWeight={700} mb="4" color={"teal.700"}>
          Library
        </Heading>
        <BookForm
          formAction={formAction}
          bookId={selectedBookId}
          resetFormAction={resetFormAction}
        />
        <BookTabs selectBook={handleSelectBook} />
      </Container>

      <Modal isOpen={isModalOpen} onModalClose={handleCloseModal}>
        <BookDetails bookId={selectedBookId} />
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
