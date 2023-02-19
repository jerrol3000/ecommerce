import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import products from "./ProductSlice";

const store = configureStore({
  reducer: { auth, products },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
