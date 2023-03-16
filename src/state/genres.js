import { createAction, createReducer } from "@reduxjs/toolkit";

export const setGenres = createAction("SET_GENRES");
export const addGenres = createAction("ADD_GENRES");
export const deleteGenres = createAction("DELETE_GENRES");

const initialState = [];

export default createReducer(initialState, {
  [setGenres]: (state, action) => action.payload,
  [addGenres]: (state, action) => {
    return [...state, action.payload];
  },
  [deleteGenres]: (state, action) => {
    return state.filter((item) => item.id !== action.payload);
  },
});
