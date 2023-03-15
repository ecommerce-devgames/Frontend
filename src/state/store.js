import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";
import usersDbReducer from "./usersDb";
import gamesReducer from "./games";
import shoppedProductsReducer from "./shoppedProducts";
import reviewsReducer from "./reviews";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    cart: cartReducer,
    user: userReducer,
    games: gamesReducer,
    shoppedProducts: shoppedProductsReducer,
    usersDb: usersDbReducer,
    reviews: reviewsReducer,
  },
  middleware: [logger],
});

export default store;
