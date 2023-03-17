import { createAction, createReducer } from "@reduxjs/toolkit";

export const setShoppingHistory = createAction("SET_SHOPPING_HISTORY");

const initialState = [];

export default createReducer(initialState, {
  [setShoppingHistory ]: (state, action) => action.payload,
});
