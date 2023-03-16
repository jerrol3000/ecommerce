import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import { fetchById } from "../store/ProductSlice";
import PurchaseForm from "./PurchaseForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    maxWidth: "800px",
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  imageContainer: {
    height: "500px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  purchaseForm: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
}));

function SingleProduct() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchById(params.productId));
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.imageContainer}>
        <img
          src={product.image}
          className={classes.image}
          alt={product.title}
        />
      </Box>
      <PurchaseForm className={classes.purchaseForm} />
    </Box>
  );
}

export default SingleProduct;
