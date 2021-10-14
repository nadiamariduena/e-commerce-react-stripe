import React from "react";
// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";
import { Navbar, Products } from "./components";
//
// KEY
import { commerce } from "./lib/commerce";
 
//
const App = () => {
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
