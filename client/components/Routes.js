import React, { useEffect } from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { me } from "../store/authSlice";
import { fetchCart } from "../store/checkoutSlice";
import SingleProduct from "./SingleProduct";
import { Login, Signup } from "./AuthForm";
import Home from "./Home";
import Rating from "./Rating";
import Reviews from "./Reviews";
import PurchaseForm from "./PurchaseForm";
import AdminDashboard from "./AdminDasboard";

const Routes = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = !!auth.id;
  const userId = auth.id;

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  return (
    <AppRoutes>
      <>
        {auth.isAdmin ? (
          <>
            {" "}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/checkout/:userId" element={<PurchaseForm />} />
            <Route path="/review/:productId" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/checkout/:userId" element={<PurchaseForm />} />
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
