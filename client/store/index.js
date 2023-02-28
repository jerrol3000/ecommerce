import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import products from "./ProductSlice";
import checkout from "./checkoutSlice";
import review from "./reviewSlice";
import rating from "./ratingSlice";
const store = configureStore({
  reducer: { auth, products, checkout, review, rating },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
