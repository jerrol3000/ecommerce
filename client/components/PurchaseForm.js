import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/purchaseForm.css";
import { createOrder, fetchCart } from "../store/checkoutSlice";
import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {
  const [size, setSize] = useState(null);
  const [customSize, setCustomSize] = useState("");
  const [customQuantity, setCustomQuantity] = useState(100);
  const [quantity, setQuantity] = useState(0);
  const [file, setFile] = useState(null);
  const [showCustomInputSize, setShowCustomInputSize] = useState(false);
  const [customInputQuantity, setCustomInputQuantity] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { id, price, name } = useSelector((state) => state.products.product);

  const handleSizeChange = (event) => {
    let input = event.target.value;
    setSize(input);
    input === "custom"
      ? setShowCustomInputSize(true)
      : setShowCustomInputSize(false);
  };

  const handleCustomSizeChange = (event) => {
    setCustomSize(event.target.value);
  };

  const handleCustomQuantityChange = (event) => {
    setCustomQuantity(Number(event.target.value));
  };

  const handleQuantityChange = (event) => {
    let input = event.target.value;
    setQuantity(input);
    input === "custom"
      ? setCustomInputQuantity(true)
      : setCustomInputQuantity(false);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const orderDetail = {
    name,
    image: file,
    price,
    size,
    quantity,
    userId: user.id,
    productId: id,
  };

  //conditionally handle checkout if it his a logged in user or a guest user
  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.id) {
      dispatch(createOrder(orderDetail));
      dispatch(fetchCart(user.id));
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        reader.onload = (() => {
          const data = {
            id,
            name,
            image: reader.result,
            price,
            size,
            quantity,
            productId: id,
            total: Number(price) * Number(quantity),
          };
          const currentCart = localStorage.getItem("cart");
          if (currentCart) {
            const guestCart = JSON.parse(currentCart);
            guestCart.push(data);
            localStorage.setItem("cart", JSON.stringify(guestCart));
          } else {
            const guestCart = [];
            guestCart.push(data);
            localStorage.setItem("cart", JSON.stringify(guestCart));
          }
        })();
      };
    }
    navigate("/home");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Upload Artwork</h2>
        <div>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        {file && (
          <div className="preview-image">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ maxWidth: "60%" }}
            />
            <p>Size: {size}</p>
            <p>Quantity: {quantity}</p>
            <p>
              Your total is:{" "}
              {customQuantity > 0
                ? Math.round(customQuantity * price)
                : quantity * price}
            </p>
          </div>
        )}
        <h2>Select Size</h2>
        <div>
          <input
            type="radio"
            name="size"
            value="2x2"
            checked={size === "2x2"}
            onChange={handleSizeChange}
          />
          <label>2x2</label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="3x3"
            checked={size === "3x3"}
            onChange={handleSizeChange}
          />
          <label>3x3</label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="4x4"
            checked={size === "4x4"}
            onChange={handleSizeChange}
          />
          <label>4x4</label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="5x5"
            checked={size === "5x5"}
            onChange={handleSizeChange}
          />
          <label>5x5</label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="custom"
            checked={size === "custom"}
            onChange={handleSizeChange}
          />
          <label>Custom</label>
          {showCustomInputSize && (
            <input
              placeholder="length x width "
              type="text"
              name="custom-size"
              value={customSize}
              onChange={handleCustomSizeChange}
            />
          )}
        </div>
        <h2>Select Quantity</h2>
        {[50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000].map(
          (amount) => (
            <div key={amount}>
              <input
                type="radio"
                name="amount"
                value={amount}
                checked={parseInt(quantity) === amount}
                onChange={handleQuantityChange}
              />
              <label>{amount}</label>
            </div>
          )
        )}
        <input
          type="radio"
          name="amount"
          value="custom"
          checked={quantity === "custom"}
          onChange={handleQuantityChange}
        />
        <label>Custom</label>
        {customInputQuantity && (
          <input
            placeholder="Enter quantity"
            type="number"
            name="custom-size"
            value={Number(customQuantity)}
            onChange={handleCustomQuantityChange}
          />
        )}
        <div className="button-container">
          <button className="submit-button" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
