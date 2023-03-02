import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import { fetchAllReviews } from "../store/reviewSlice";
import Product from "./Product";
import RatingModal from "./RatingModal";
import "./css/product.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { allReviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const averageRating = (id) => {
    const array = allReviews.filter((review) => review.productId === id);
    return array.length
      ? Math.floor(
          array.reduce((pre, cur) => pre + Number(cur.rating), 0) / array.length
        )
      : 0;
  };

  return (
    <div className="product-container">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <RatingModal
              productId={product.id}
              averageRating={averageRating(product.id)}
            />
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              id={product.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
