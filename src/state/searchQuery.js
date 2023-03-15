import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSearchQuery = createAction("SET_SEARCH_QUERY");

const initialState = "";

export default createReducer(initialState, {
  [setSearchQuery]: (state, action) => action.payload,
});