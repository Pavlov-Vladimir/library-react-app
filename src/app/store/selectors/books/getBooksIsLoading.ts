import { RootState } from "../../rootReducer";

export const getBooksIsLoading = (store: RootState) => store?.books?.isLoading;
