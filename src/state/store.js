import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer, 
    user: userReducer
  },
  middleware: [logger],
  
}, );

export default store;
