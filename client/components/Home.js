import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import { fetchReviews } from "../store/reviewSlice";
import Product from "./Product";
import RatingModal from "./RatingModal";
import "./css/product.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const review = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews(2));
  }, []);
  console.log("review", review);
  return (
    <div className="product-container">
      {products.map((product, i) => {
        return (
          <div key={i + 2}>
            <RatingModal productId={product.id} />
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
