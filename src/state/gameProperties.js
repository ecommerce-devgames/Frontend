import { createAction, createReducer } from "@reduxjs/toolkit";

export const setGenres = createAction("SET_GENRES");
export const setDevelopers = createAction("SET_DEVELOPERS");
export const setPlatforms = createAction("SET_PLATFORMS");
export const setTags = createAction("SET_TAGS");


const initialState = {
  genres : [],
  developers : [],
  platforms: [],
  tags: [],
};

export default createReducer(initialState, {
  [setGenres]: (state, action) => { return { ...state, genres: [...state.genres, action.payload] }}, 
  [setDevelopers]: (state, action) => { return { ...state, developers: [...state.developers, action.payload] }},
  [setPlatforms]: (state, action) => { return { ...state, platforms: [...state.platforms, action.payload] }},
  [setTags]: (state, action) => { return { ...state, tags: [...state.tags, action.payload] }},
});