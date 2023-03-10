import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProduct = createAction("SET_PRODUCT");

const initialState = {};

export default createReducer(initialState, {
  [setProduct]: (state, action) => action.payload,
});
