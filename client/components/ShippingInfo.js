import React from "react";
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
              <TextField fullWidth label="Full Name" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="State" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Zip Code" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone Number" type="tel" required />
            </Grid>
          </Grid>
        </FormContainer>
        <Box sx={{ mt: 2 }}></Box>
      </form>
    </Box>
  );
};

export default ShippingInfo;
