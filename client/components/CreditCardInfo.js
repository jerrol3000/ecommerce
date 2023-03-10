import React from "react";
import { TextField, Button, Box } from "@mui/material";

const CreditCardInfo = ({ onPrev, onNext }) => {
  return (
    <Box sx={{ mx: "auto", maxWidth: 400 }}>
      <h2>Step 2: Credit Card Information</h2>
      <Box component="form" onSubmit={onNext} sx={{ mt: 2 }}>
        <TextField label="Name on Card" required fullWidth />
        <TextField label="Card Number" required fullWidth sx={{ mt: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField label="Expiration Date" required sx={{ mr: 2 }} />
          <TextField label="CVV" required />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {/* <Button variant="contained" onClick={onPrev}>
            Back
          </Button> */}
          {/* <Button type="submit" variant="contained">
            Next
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CreditCardInfo;
