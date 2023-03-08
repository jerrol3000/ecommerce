import React, { useEffect } from "react";
import { fetchCart } from "../store/checkoutSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function PreviewCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchCart(params.userId));
  }, []);

  return (
    <div>
      {checkout.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="item" />
          <div>{item.price}</div>
          <div>{item.size}</div>
          <div>{item.quantity}</div>
        </div>
      ))}
    </div>
  );
}

export default PreviewCart;
