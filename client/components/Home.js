import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import Product from "./Product";
import "./css/product.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products) || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product-container">
      {products
        ? products.map((product) => {
            return (
              <div key={product.id}>
                <Product
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })
        : "Cannot reaah databse"}
    </div>
  );
}

export default Home;
