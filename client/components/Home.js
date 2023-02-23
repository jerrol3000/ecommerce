import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import Product from "./Product";
import RatingModal from "./RatingModal";
import "./css/product.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log("products", products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="product-container">
      {products.map((product, i) => {
        return (
          <div>
            <RatingModal key={i + 2} />
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
