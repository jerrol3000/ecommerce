import React, { useEffect } from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { me } from "../store/authSlice";
import SingleProduct from "./SingleProduct";
import { Login, Signup } from "./AuthForm";
import Home from "./Home";
import Checkout from "./Checkout";
import Rating from "./Rating";
import Reviews from "./Reviews";
import PreviewCart from "./PreviewCart";

const Routes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = !!auth.id;

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <AppRoutes>
      <>
        {auth.userType === "admin" ? (
          <>
            {/* show admin page
          show customer information
          show previously purchased */}
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/:userId" element={<PreviewCart />} />
            <Route path="/review/:productId" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </>
    </AppRoutes>
  );
};

export default Routes;
