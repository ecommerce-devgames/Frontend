import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});