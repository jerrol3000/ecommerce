import React, { useState } from "react";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  borderRadius: "8px",
}));

const CreditCardInfo = ({ onNext }) => {
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleSameAsShippingChange = (event) => {
    setSameAsShipping(event.target.checked);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
        "@media (max-width:600px)": {
          marginBottom: "12em",
        },
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Step 2: Credit Card Information
      </Typography>
      <form onSubmit={onNext}>
        <FormContainer>
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
                  <TextField
                    label="Billing Address Line 1"
                    required
                    fullWidth
                  />
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
        </FormContainer>
      </form>
    </Box>
  );
};

export default CreditCardInfo;
