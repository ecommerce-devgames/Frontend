import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCartTotalPrice = createAction("SET_CART_TOTAL_PRICE");

const initialState = [];

export default createReducer(initialState, {
  [setCartTotalPrice]: (state, action) => action.payload,
});
