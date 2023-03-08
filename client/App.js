import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import Footer from "./components/Footer";
import { fetchCart } from "./store/checkoutSlice";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
