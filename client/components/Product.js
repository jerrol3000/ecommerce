import React from "react";
import { NavLink } from "react-router-dom";
import "./css/product.css";

function Product({ name, image, price, description }) {
  return (
    <div>
      <div className="product-card">
        <h2 className="product-title">{name}</h2>

        <NavLink to="/product" className="product-image">
          <img src={image} />
        </NavLink>
        <p className="product-price">${price} per unit</p>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
}

export default Product;
