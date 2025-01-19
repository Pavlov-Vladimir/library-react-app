import { RootState } from "../../rootReducer";

export const getRecommendedBooks = (state: RootState) => state?.books?.recommended;
