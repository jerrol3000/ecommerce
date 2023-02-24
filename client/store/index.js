import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import products from "./ProductSlice";
import checkout from "./checkoutSlice";
import review from "./reviewSlice";

const store = configureStore({
  reducer: { auth, products, checkout, review },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
