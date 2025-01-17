import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./rootReducer";
import { AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
