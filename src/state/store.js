import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer, 
    user: userReducer
  },
});

export default store;
