import { useState } from "react";
import { LABELS_ES } from "../constants/LABELS_ES";
import { StylesContext } from "./stylesContext/StylesContext ";
import { LanguageContext } from "./stylesContext/LanguageContext";
import { STYLES } from "../styles/styles";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('es');
  
    const changeLanguage = (newLanguage: string) => {
      setLanguage(newLanguage);
    };
  
    const labels = language === 'es' ? LABELS_ES : LABELS_ES;
  
    return (
      <StylesContext.Provider value={STYLES}>
        <LanguageContext.Provider value={{ language, changeLanguage, labels }}>
          {children}
        </LanguageContext.Provider>
      </StylesContext.Provider>
    );
  };