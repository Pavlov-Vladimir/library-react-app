import { RootState } from "../../rootReducer";

export const getSelectedBook = (store: RootState) => store?.books?.selectedBook;
