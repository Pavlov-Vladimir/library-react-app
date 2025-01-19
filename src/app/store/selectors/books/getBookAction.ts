import { RootState } from "../../rootReducer";

export const getBookAction = (store: RootState) => store?.books?.bookAction;
