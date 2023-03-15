import { createAction, createReducer } from "@reduxjs/toolkit";

export const setReviews = createAction("SET_REVIEWS");

const initialState = [];

export default createReducer(initialState, {
  [setReviews]: (state, action) => action.payload,
});
