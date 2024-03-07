import  { createContext } from 'react';
import { LABELS_ES } from '../../constants/LABELS_ES';

export const LanguageContext = createContext({
  language: 'es',
  labels: LABELS_ES,
});




