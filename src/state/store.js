import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";
import shoppedProductsReducer from "./shoppedProducts";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    shoppedProducts: shoppedProductsReducer,
  },
  middleware: [logger],
});

export default store;
