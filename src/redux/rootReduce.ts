import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { languageReducer } from './reducers/utilsReducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  languaje: languageReducer.reducer,
});

export default rootReducer;