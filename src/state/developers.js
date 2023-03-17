import { createAction, createReducer } from "@reduxjs/toolkit";

export const setDevelopers = createAction("SET_DEVELOPERS");

const initialState = [];

export default createReducer(initialState, {
  [setDevelopers]: (state, action) => action.payload,
});