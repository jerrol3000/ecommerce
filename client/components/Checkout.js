import React, { useEffect, useState } from "react";
import { fetchCart } from "../store/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import "./css/checkout.css";
import PreviewCart from "./PreviewCart";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Replace with actual payment processing logic
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <PreviewCart />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name on Card:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiration">Expiration:</label>
            <input
              type="text"
              name="expiration"
              id="expiration"
              value={formData.expiration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Process Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
