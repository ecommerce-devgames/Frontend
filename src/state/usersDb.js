import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUsersDb = createAction("SET_USERSDB");
export const removeFromUsersDb = createAction("REMOVE_FROM_USERSDB");
export const editAdmin = createAction("EDIT_ADMIN");

const initialState = [];

export default createReducer(initialState, {
  [setUsersDb]: (state, action) => action.payload,
  [removeFromUsersDb]: (state, action) => {
    return state.filter((user) => user.id !== action.payload);
  },
  [editAdmin]: (state, action) => {
    state.map((user) => {
      if (user.id !== action.payload) {
        return user;
      } else {
        user.isAdmin = !user.isAdmin;
        return user;
      }
    });
  },
});
