import React, { useEffect, useState } from "react";
import { LABELS_ES } from "../constants/LABELS_ES";
import { LanguageContext } from "./stylesContext/LanguageContext";
import { STYLES } from "../styles/styles";
import { Toast, ToastContext } from "./toastContext/toastContext";
import { useSelector } from "react-redux";
import { Loading, LoadingContext } from "./toastContext/LoadingContext";
import { StylesContext } from "./stylesContext/StylesContext ";

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

  /* loadingContext */
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  /* MessageContext */
  const [message, setMessage] = useState(null);

  // Función para mostrar el mensaje
  const showMessage = (msg: any) => {
    setMessage(msg);
  };

  // Función para ocultar el mensaje
  const hideMessage = () => {
    setMessage(null);
  };

  return (
    <StylesContext.Provider value={STYLES}>
      <LanguageContext.Provider value={{ language, labels }}>
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
          {isLoading && <Loading />}
          <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast} />}
          </ToastContext.Provider>
        </LoadingContext.Provider>
      </LanguageContext.Provider>
    </StylesContext.Provider>
  );
};
