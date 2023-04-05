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

const ShippingInfo = ({ onNext, handleShippingInfoChange }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  localStorage.setItem("shippingInfo", JSON.stringify(formData));

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zip",
      "email",
      "phoneNumber",
    ];
    const newErrors = {};
    console.log("newErrors", newErrors);

    handleShippingInfoChange(formData);

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
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
                required
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                error={!!errors.zip}
                helperText={errors.zip}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.zip}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                required
                fullWidth
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
