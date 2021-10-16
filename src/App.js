import React, { useState, useEffect } from "react";
// KEY
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";

//
const App = () => {
  //
  //
  //
  const [products, setProducts] = useState([]);
  //
  //
  //
  const [cart, setCart] = useState([]);
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

    // update our  data **
    setProducts(data);
  };

  //
  // The fetch related to the CART
  const fetchCart = async () => {
    // so what we want do here? we want to fetch something
    setCart(await commerce.cart.retrieve());
    // - we want to fetch a response* from await*
    //
    // update our cart **
  };

  //
  //
  const handleAddToCart = async (productId, quantity) => {
    // so what we want do here? we want to fetch something
    const item = await commerce.cart.add(productId, quantity);
    // - we want to fetch a response* from await: commercejs*
    // so what are we going to add here in the parenthesis: cart.add();?
    // we are going to add the productId!
    // So we are going to use this 2 params:
    // (productId, quantity) to require data to the API commercejs

    //
    // update our cart **
    setCart(item.cart);
    //
    //
  };

  //
  //
  //

  useEffect(() => {
    fetchProducts();
    fetchCart();
    //
  }, []);
  //
  // console.log(cart);
  //
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
