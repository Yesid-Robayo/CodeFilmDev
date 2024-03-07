import { useEffect, useState } from "react";
import { LABELS_ES } from "../constants/LABELS_ES";
import { StylesContext } from "./stylesContext/StylesContext ";
import { LanguageContext } from "./stylesContext/LanguageContext";
import { STYLES } from "../styles/styles";
import { Toast, ToastContext } from "./toastContext/toastContext";
import { useSelector } from "react-redux";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  /* languageContext */
  const language = useSelector((state: any) => state.languaje.language);
  const [labels, setLabels] = useState(LABELS_ES);
  useEffect(() => {
    if (language === "es") {
      setLabels(LABELS_ES);
    } else if (language === "en") {
      setLabels(LABELS_ES);
    } else {
      setLabels(LABELS_ES);
    }
  }, [language]);

  /* toastContext */
  const [toast, setToast] = useState(null);

  const showToast = (message: any) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  return (
    <StylesContext.Provider value={STYLES}>
      <LanguageContext.Provider value={{ language, labels }}>
        <ToastContext.Provider value={{ showToast }}>
          {children}
          {toast && <Toast message={toast} />}
        </ToastContext.Provider>

      </LanguageContext.Provider>
    </StylesContext.Provider>
  );
};