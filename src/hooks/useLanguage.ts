import { useContext } from "react";
import { LanguageContext } from "../context/stylesContext/LanguageContext";

export const useLabels = () => {
    const { labels } = useContext(LanguageContext);
    return labels;
  };