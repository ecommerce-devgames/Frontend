import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProduct = createAction("SET_PRODUCT");

const initialState = JSON.parse(localStorage.getItem("product")) || {};

export default createReducer(initialState, {
  [setProduct]: (state, action) => action.payload,
});
