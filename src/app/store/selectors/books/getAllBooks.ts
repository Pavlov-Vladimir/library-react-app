import { RootState } from "../../rootReducer";

export const getAllBooks = (state: RootState) => state?.books?.books;
