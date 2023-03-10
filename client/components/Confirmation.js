import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";

const Confirmation = ({ onPrev, onSubmit }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Step 3: Confirmation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Review your order details:
      </Typography>
      <Grid container spacing={1} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Shipping Information</Typography>
          <Typography variant="subtitle2">...</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Credit Card Information</Typography>
          <Typography variant="subtitle2">...</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Order Summary</Typography>
          <Typography variant="subtitle2">...</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
      ></Box>
    </Box>
  );
};

export default Confirmation;
