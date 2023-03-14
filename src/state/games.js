import { createAction, createReducer } from "@reduxjs/toolkit";

export const setGames = createAction("SET_GAMES");

const initialState = [];

export default createReducer(initialState, {
  [setGames]: (state, action) => action.payload,
});