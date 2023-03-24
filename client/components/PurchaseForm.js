import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, fetchCart, addToLocalCart } from "../store/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    backgroundColor: "#f2f2f2",
    borderRadius: theme.spacing(1),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
      flexDirection: "row",
      justifyContent: "space-between",
      width: "30%",
      float: "right",
      alignItems: "center",
    },

    "& button": {
      margin: theme.spacing(2),
    },
  },

  inputContainer: {
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      marginRight: theme.spacing(4),
      marginBottom: 0,
    },
  },
  selectContainer: {
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      marginRight: theme.spacing(4),
      marginBottom: 0,
    },
  },
  customSizeInput: {
    marginTop: theme.spacing(2),
  },
  customQuantityInput: {
    marginTop: theme.spacing(2),
  },
  previewImageContainer: {
    marginTop: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      width: "auto",
    },
  },
  previewImage: {
    maxWidth: "40%",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      maxWidth: "60%",
    },
    "& img": {
      maxWidth: "100%",
      maxHeight: "300px",
      objectFit: "contain",
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[2],
    },
  },

  total: {
    fontWeight: "bold",
  },
  addButton: {
    marginTop: theme.spacing(2),
    alignSelf: "flex-end",
  },
}));

const PurchaseForm = () => {
  const classes = useStyles();
  const [size, setSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [customQuantity, setCustomQuantity] = useState(100);
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState("");
  const [showCustomInputSize, setShowCustomInputSize] = useState(false);
  const [customInputQuantity, setCustomInputQuantity] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { id, price, name } = useSelector((state) => state.products.product);

  const handleSizeChange = (event) => {
    let input = event.target.value;
    setSize(input);
    input === "custom"
      ? setShowCustomInputSize(true)
      : setShowCustomInputSize(false);
  };

  const handleCustomSizeChange = (event) => {
    setCustomSize(event.target.value);
  };

  const handleCustomQuantityChange = (event) => {
    setCustomQuantity(Number(event.target.value));
  };

  const handleQuantityChange = (event) => {
    let input = event.target.value;
    setQuantity(input);
    input === "custom"
      ? setCustomInputQuantity(true)
      : setCustomInputQuantity(false);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const orderDetail = {
    name,
    image: file,
    price,
    size,
    quantity,
    userId: user.id,
    productId: id,
  };

  const handleFormSubmit = (navigateTo) => (event) => {
    event.preventDefault();
    if (quantity && size && file) {
      if (user.id) {
        dispatch(createOrder(orderDetail));
        dispatch(fetchCart(user.id));
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const data = {
            id,
            name,
            image: reader.result,
            price,
            size,
            quantity,
            productId: id,
          };
          dispatch(addToLocalCart(data));
        };
      }
      navigate(navigateTo);
    }
  };

  const handleSubmit = handleFormSubmit("/home");
  const handleCheckout = handleFormSubmit(`/checkout/${user.id}`);

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.inputContainer}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" gutterBottom>
                Upload Artwork
              </Typography>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className={classes.inputFile}
              />
              {file && (
                <div className={classes.previewImage}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className={classes.image}
                  />

                  {size && file && quantity && (
                    <Typography variant="body1" gutterBottom>
                      Your total is: {quantity * price}
                    </Typography>
                  )}
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.inputContainer}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" gutterBottom>
                Select Size
              </Typography>
              <FormControl className={classes.selectControl}>
                <Select
                  name="size"
                  value={size}
                  onChange={handleSizeChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select Size" }}
                >
                  <MenuItem value="" disabled>
                    Select Size
                  </MenuItem>
                  <MenuItem value="2x2">2x2</MenuItem>
                  <MenuItem value="3x3">3x3</MenuItem>
                  <MenuItem value="4x4">4x4</MenuItem>
                  <MenuItem value="5x5">5x5</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              {showCustomInputSize && (
                <input
                  placeholder="length x width"
                  type="text"
                  name="custom-size"
                  value={customSize}
                  onChange={handleCustomSizeChange}
                  className={classes.customInput}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.inputContainer}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" gutterBottom>
                Select Quantity
              </Typography>
              <FormControl className={classes.selectControl}>
                <Select
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select Quantity" }}
                >
                  <MenuItem value="" disabled>
                    Select Quantity
                  </MenuItem>
                  {[
                    50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000,
                  ].map((amount) => (
                    <MenuItem key={amount} value={amount}>
                      {amount}
                    </MenuItem>
                  ))}
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              {customInputQuantity && (
                <input
                  placeholder="Quantity"
                  type="number"
                  name="custom-quantity"
                  min="1"
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  className={classes.customInput}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Add to Cart
        </Button>
        {size && file && quantity && (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.addButton}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        )}
      </form>
    </div>
  );
};

export default PurchaseForm;
