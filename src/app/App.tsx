import { Container, Heading } from "@chakra-ui/react";
import { Modal } from "@/shared/ui/Modal";
import { BookDetails } from "@/entities/BookDetails";
import { Toaster } from "@/components/ui/toaster";
import { BookForm } from "@/widgets/BookForm";
import { BookTabs } from "@/widgets/BookTabs";
import { getBookAction } from "./store/selectors/books/getBookAction";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setBookAction } from "./store/slices/booksSlice/booksSlice";

function App() {
  const dispatch = useAppDispatch();
  const bookAction = useAppSelector(getBookAction);

  function handleCloseModal() {
    dispatch(setBookAction(null));
  }

  return (
    <main>
      <Container maxW="6xl" p="4">
        <Heading as="h1" size="4xl" fontWeight={700} mb="4" color={"teal.700"}>
          Library
        </Heading>
        <BookForm />
        <BookTabs />
      </Container>

      <Modal isOpen={bookAction === "view"} onModalClose={handleCloseModal}>
        <BookDetails />
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
