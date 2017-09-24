import { combineReducers } from 'redux';
import browser from './browserReducer';

const rootReducer = combineReducers({
  browser
});

export default rootReducer;
