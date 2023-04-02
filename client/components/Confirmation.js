import React, { useEffect } from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCart } from "../store/checkoutSlice";

const Confirmation = ({ onPrev, onSubmit }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { checkout } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCart(params.userId));
  }, []);

  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const billingAddress = localStorage.getItem("billingAddress")
    ? JSON.parse(localStorage.getItem("billingAddress"))
    : null;
  const cardData = JSON.parse(localStorage.getItem("cardData"));

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Step 3: Confirmation
      </Typography>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 2,
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          "@media (max-width:600px)": {
            marginBottom: "12em",
          },
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Review your order details:
        </Typography>
        <Grid container spacing={1} sx={{ my: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Shipping Information</Typography>
            <Typography variant="subtitle2">
              {shippingInfo.fullName} <br />
              {shippingInfo.address} <br />
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}{" "}
              <br />
              {shippingInfo.email} <br />
              {shippingInfo.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Credit Card Information</Typography>
            <Typography variant="subtitle2">
              Cardholder Name: {cardData.cardName} <br />
              Card Number: {cardData.cardNumber} <br />
              CVV: {cardData.cvv} <br />
              Expiration Date: {cardData.exDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Order Summary</Typography>
            {checkout.map((item) => (
              <Typography key={item.id}>
                {item.name} ({item.size}) Total: ${item.price * item.quantity}
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
        ></Box>
      </Box>
    </>
  );
};

export default Confirmation;
