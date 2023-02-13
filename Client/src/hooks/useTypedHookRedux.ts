import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "../Redux/Store";

/* Nos permite utilizar el useDispatch y useSelector ya tipificados en nuestra app
  Esto se hace en caso de que usemos TypeScript. Sino seria  useDispatch y useSelector 
  comunmente.
*/
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
