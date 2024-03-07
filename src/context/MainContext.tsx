import { useState } from "react";
import { LABELS_ES } from "../constants/LABELS_ES";
import { StylesContext } from "./stylesContext/StylesContext ";
import { LanguageContext } from "./stylesContext/LanguageContext";
import { STYLES } from "../styles/styles";
import { Toast, ToastContext } from "./toastContext/toastContext";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  /* languageContext */
  const [language, setLanguage] = useState('es');

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const labels = language === 'es' ? LABELS_ES : LABELS_ES;
  /* ToastContext */
  const [toast, setToast] = useState(null);

  const showToast = (message: any) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  return (
    <StylesContext.Provider value={STYLES}>
      <LanguageContext.Provider value={{ language, changeLanguage, labels }}>
      <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast} />}
        </ToastContext.Provider>
    
      </LanguageContext.Provider>
    </StylesContext.Provider>
  );
};