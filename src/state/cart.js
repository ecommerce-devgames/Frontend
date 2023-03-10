import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCart = createAction("SET_CART");
export const removeFromCart = createAction("REMOVE_FROM_CART");

const initialState = [];

export default createReducer(initialState, {
  [setCart]: (state, action) => [...state, action.payload],
  [removeFromCart]: (state, action) => {
    return state.filter((item) => item.id !== action.payload.id);
  },
});
