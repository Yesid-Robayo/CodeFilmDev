import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
});

export default rootReducer;