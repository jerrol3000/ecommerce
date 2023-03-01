import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import { fetchAllReviews } from "../store/reviewSlice";
import Product from "./Product";
import RatingModal from "./RatingModal";
import "./css/product.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const review = useSelector((state) => state.review);

  console.log("state", review);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllReviews());
  }, []);
  const averageRating = (id) => {
    const array = review.filter((review) => review.productId === id);
    return array.length
      ? array.reduce((pre, cur) => pre + cur.productId, 0) / array.length
      : 0;
  };

  return (
    <div className="product-container">
      {products.map((product, i) => {
        return (
          <div key={i + 2}>
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
