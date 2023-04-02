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
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exDate, setExDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const cardData = {
    cardName,
    cardNumber,
    exDate,
    cvv,
  };

  const billingAddress = {
    address,
    city,
    state,
    zipCode,
  };
  localStorage.setItem("cardData", JSON.stringify(cardData));
  if (!sameAsShipping) {
    localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
  } else {
    localStorage.removeItem("billingAddress");
  }

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
              <TextField
                fullWidth
                label="Name on Card"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                required
                value={exDate}
                onChange={(e) => setExDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                required
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
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
                    fullWidth
                    label="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
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
