import * as types from './actionTypes';

export const test = '';

export const addBrowserDimentions = ({ width, height }) => ({
  type: types.ADD_BROWSER_DIMENTIONS,
  dimentions: { width, height }
});
