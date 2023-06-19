import { useDispatch } from "react-redux";
import { TypedDispatch } from "../redux/store";

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
