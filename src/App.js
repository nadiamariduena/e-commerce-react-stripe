import React, { useState, useEffect } from "react";
// KEY
import { commerce } from "./lib/commerce";
import { Navbar, Products } from "./components";

//
const App = () => {
  const [products, setProducts] = useState([]);
  //
  //
  //
  const [cart, setCart] = useState({});
  //  // By default that cart is going to be **empty**, because in the beginning there s no products in our basket/cart
  //
  //
  // so what we want do here? we want to fetch something
  // - we want to fetch a response* from await*
  // - So we have to await something
  // - And that something is going to be a specific API call to this commerce instance
  // - its going to be as simple as commerce.products.list, and then you 'call it ()' as a function
  // - this is going to return a promise:  commerce.products.list(), so we have to await to see what is inside that promise
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  //
  // The fetch related to the CART
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    // so what we want do here? we want to fetch something
    // - we want to fetch a response* from await*
    setCart(cart);
  };
  //

  useEffect(() => {
    fetchProducts();
    fetchCart();
    //
  }, []);
  //
  console.log(cart);
  //
  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
