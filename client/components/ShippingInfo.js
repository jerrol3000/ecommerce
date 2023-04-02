import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  borderRadius: "8px",
  "@media (max-width: 600px)": {
    /* Adjust layout for small screens */
    "& .MuiTypography-h2": {
      fontSize: "0.5rem",
    },
    "& .MuiButton-root": {
      padding: "0.5rem",
    },
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
    "& .MuiBox-root": {
      marginLeft: "5em",
      marginRight: "5em",
    },
  },
  "@media (max-width: 200px)": {
    /* Adjust layout for extra small screens */
    "& .MuiTypography-h2": {
      fontSize: "0.25rem",
    },
    "& .MuiBox-root": {
      marginLeft: "5em",
      marginRight: "5em",
    },
  },
}));

const ShippingInfo = ({ onNext }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const formData = {
    fullName,
    address,
    city,
    state,
    zipCode,
    email,
    phoneNumber,
  };
  localStorage.setItem("shippingInfo", JSON.stringify(formData));
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        "@media (max-width:600px)": {
          marginBottom: "12em",
        },
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Step 1: Shipping Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
        </FormContainer>
        <Box sx={{ mt: 2 }}></Box>
      </form>
    </Box>
  );
};

export default ShippingInfo;
