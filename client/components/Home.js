import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";
import Product from "./Product";
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
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            id={product.id}
          />
        );
      })}
    </div>
  );
}

export default Home;
