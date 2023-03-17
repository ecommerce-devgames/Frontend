import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";
import usersDbReducer from "./usersDb";
import gamesReducer from "./games";
import shoppingHistoryReducer from "./shoppingHistory";
import reviewsReducer from "./reviews";
import searchQueryReducer from "./searchQuery";
import genresReducer from "./genres";
import developersReducer from "./developers";
import platformsReducer from "./platforms";
import tagsReducer from "./tags";
import cartTotalPriceReducer from "./cartTotalPrice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    games: gamesReducer,
    shoppingHistory: shoppingHistoryReducer,
    usersDb: usersDbReducer,
    reviews: reviewsReducer,
    searchQuery: searchQueryReducer,
    genres: genresReducer,
    developers: developersReducer,
    platforms: platformsReducer,
    tags: tagsReducer,
    cartTotalPrice: cartTotalPriceReducer,
  },
  middleware: [logger],
});

export default store;
