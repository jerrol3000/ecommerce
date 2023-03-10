import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Grid } from "@mui/material";

const CreditCardInfo = ({ onPrev, onNext }) => {
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleSameAsShippingChange = (event) => {
    setSameAsShipping(event.target.checked);
  };

  return (
    <Box sx={{ mx: "auto", maxWidth: 400 }}>
      <h2>Step 2: Credit Card Information</h2>
      <Box
        component="form"
        onSubmit={onNext}
        sx={{ mt: 2, p: 2, border: "1px solid #ddd" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name on Card" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Card Number" required fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Expiration Date" required fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="CVV" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsShipping}
                  onChange={handleSameAsShippingChange}
                />
              }
              label="Same as shipping address"
            />
          </Grid>
          {!sameAsShipping && (
            <>
              <Grid item xs={12}>
                <TextField label="Billing Address Line 1" required fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Billing Address Line 2" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="City" required fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="State" required fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Zip Code" required fullWidth />
              </Grid>
            </>
          )}
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
        ></Box>
      </Box>
    </Box>
  );
};

export default CreditCardInfo;
