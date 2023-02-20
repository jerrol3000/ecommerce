import React, { useState } from "react";
import "./css/purchaseForm.css";

const PurchaseForm = () => {
  const [size, setSize] = useState(null);
  const [customSize, setCustomSize] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [file, setFile] = useState(null);
  const [showCustomInputSize, setShowCustomInputSize] = useState(false);
  const [customInputQuantity, setCustomInputQuantity] = useState(false);

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
    setCustomQuantity(event.target.value);
  };

  const handleQuantityChange = (event) => {
    let input = event.target.value;
    setQuantity(input);
    input === "custom"
      ? setCustomInputQuantity(true)
      : setCustomInputQuantity(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission here
  };
  console.log(customInputQuantity);
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Upload Artwork</h2>
        <div>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        {file && (
          <div>
            <h3>Preview:</h3>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ maxWidth: "60%" }}
            />
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
          <label>Custom:</label>
          {showCustomInputSize && (
            <input
              placeholder="Enter size"
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
        <label>Custom:</label>
        {customInputQuantity && (
          <input
            placeholder="Enter quantity"
            type="text"
            name="custom-size"
            value={customQuantity}
            onChange={handleCustomQuantityChange}
          />
        )}
        <div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
