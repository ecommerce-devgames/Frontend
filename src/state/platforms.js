import { createAction, createReducer } from "@reduxjs/toolkit";

export const setPlatforms = createAction("SET_PLATFORMS");

const initialState = [];

export default createReducer(initialState, {
  [setPlatforms]: (state, action) => action.payload,
});