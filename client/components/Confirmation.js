import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";

const Confirmation = ({ onPrev, onSubmit }) => {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Step 3: Confirmation
      </Typography>
      <Typography variant="body1" gutterBottom>
        Review your order details:
      </Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Shipping Information</Typography>
          <Typography variant="body1">...</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Credit Card Information</Typography>
          <Typography variant="body1">...</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Order Summary</Typography>
          <Typography variant="body1">...</Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Button variant="contained" onClick={onPrev}>
          Back
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button> */}
      </Box>
    </Box>
  );
};

export default Confirmation;
