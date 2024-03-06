import { useContext } from "react";
import { StylesContext } from "../context/stylesContext/StylesContext ";

export const useStyles = () => useContext(StylesContext);
