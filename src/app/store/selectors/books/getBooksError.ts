import { RootState } from "../../rootReducer";

export const getBooksError = (store: RootState) => store?.books?.error;
