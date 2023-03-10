import React from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContainer = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "100%",
  maxWidth: "500px",
  padding: theme.spacing(2),
  boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  borderRadius: "8px",
}));

const ShippingInfo = ({ onNext }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <FormContainer>
      <Typography variant="h5" align="center" gutterBottom>
        Step 1: Shipping Information
      </Typography>
      <form onSubmit={handleSubmit}>
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
        </Grid>
        {/* <Button type="submit" variant="contained" color="primary" fullWidth>
          Next
        </Button> */}
      </form>
    </FormContainer>
  );
};

export default ShippingInfo;
