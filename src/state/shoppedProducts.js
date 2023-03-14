import { createAction, createReducer } from "@reduxjs/toolkit";

export const setShoppedProducts = createAction("SET_SHOPPEDPRODUCTS");

const initialState = [];

export default createReducer(initialState, {
  [setShoppedProducts]: (state, action) => [...state, ...action.payload],
});
