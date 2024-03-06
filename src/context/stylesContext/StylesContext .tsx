import { createContext, useContext } from 'react';
import { STYLES } from '../../styles/styles';

export const StylesContext = createContext(STYLES);

export const useStyles = () => useContext(StylesContext);


