import React, { useEffect } from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { me } from "../store/authSlice";
import SingleProduct from "./SingleProduct";
import { Login, Signup } from "./AuthForm";
import Home from "./Home";

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
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
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
