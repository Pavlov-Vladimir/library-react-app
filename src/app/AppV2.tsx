import { Container, Heading } from "@chakra-ui/react";
import { Modal } from "@/shared/ui/Modal";
import { BookDetails } from "@/entities/BookDetails";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ACTION_TRIGGER_TYPE } from "@/shared/constants/common";
import { BookForm } from "@/widgets/BookForm";
import { BookTabs } from "@/widgets/BookTabs";
import { useSelector } from "react-redux";
import { getBookAction } from "./store/selectors/books/getBookAction";
import { useAppDispatch } from "./store/hooks";
import { resetSelectedBook, setBookAction } from "./store/slices/booksSlice/booksSlice";

function App() {
  const [selectedBookId, setSelectedBookId] = useState<number>(-1);
  const [formAction, setFormAction] = useState<ACTION_TRIGGER_TYPE>(ACTION_TRIGGER_TYPE.ADD);

  const dispatch = useAppDispatch();
  const bookAction = useSelector(getBookAction);

  function handleCloseModal() {
    dispatch(setBookAction(null));
    dispatch(resetSelectedBook());
  }

  function resetFormAction() {
    setFormAction(ACTION_TRIGGER_TYPE.ADD);
  }

  return (
    <main>
      <Container
        maxW="6xl"
        p="4"
      >
        <Heading
          as="h1"
          size="4xl"
          fontWeight={700}
          mb="4"
          color={"teal.700"}
        >
          Library
        </Heading>
        <BookForm
          formAction={formAction}
          bookId={selectedBookId}
          resetFormAction={resetFormAction}
        />
        <BookTabs />
      </Container>

      <Modal
        isOpen={bookAction === "view"}
        onModalClose={handleCloseModal}
      >
        <BookDetails />
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
