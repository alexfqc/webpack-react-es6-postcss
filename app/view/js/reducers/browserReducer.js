import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.browser, action) => {
  if (action.type === types.ADD_BROWSER_DIMENTIONS) {
    return Object.assign({}, state, action.dimentions);
  }
  return state;
};
