import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchById } from "../store/ProductSlice";
import PurchaseForm from "./PurchaseForm";

function SingleProduct() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchById(params.productId));
  }, []);

  return (
    <div>
      <img src={product.image} style={{ height: "90vh", width: "73%" }} />
      <PurchaseForm />
    </div>
  );
}

export default SingleProduct;
