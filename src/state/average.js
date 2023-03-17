import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAverage = createAction("SET_AVERAGE");

const initialState = 0;

export default createReducer(initialState, {
  [setAverage]: (state, action) => action.payload,
});
