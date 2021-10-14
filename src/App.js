import React, { useState, useEffect } from "react";
import { Navbar, Products } from "./components";
// KEY
import { commerce } from "./lib/commerce";

//
const App = () => {
  const [products, setProducts] = useState([]);
  //
  // so what we want do here? we want to fetch something
  // - we want to fetch a response* from await*
  // - So we have to await something
  // - And that something is going to be a specific API call to this commerce instance
  // - its going to be as simple as commerce.products.list, and then you 'call it ()' as a function
  // - this is going to return a promise:  commerce.products.list(), so we have to await to see what is inside that promise
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    // {data} is going to be our products
    setProducts(data);
  };

  //

  useEffect(() => {
    fetchProducts();
    //
  }, []);
  //
  console.log(products);
  //
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
