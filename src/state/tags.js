import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTags = createAction("SET_TAGS");

const initialState = [];

export default createReducer(initialState, {
  [setTags]: (state, action) => action.payload,
});