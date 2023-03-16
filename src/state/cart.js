import { createAction, createReducer } from "@reduxjs/toolkit";

export const importCartFromDb = createAction ("IMPORT_CART_FROM_DB")
export const setCart = createAction("SET_CART");
export const removeFromCart = createAction("REMOVE_FROM_CART");

const initialState = [];

export default createReducer(initialState, {
  [importCartFromDb]: (state, action) => action.payload,
  [setCart]: (state, action) =>
    action.payload === "" ? [] : [...state, action.payload],
  [removeFromCart]: (state, action) => {
    return state.filter((item) => item.id !== action.payload.id);
  },
});
