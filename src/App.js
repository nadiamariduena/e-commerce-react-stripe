import React, { useState, useEffect } from "react";
// KEY
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    const { cart } = await commerce.cart.add(productId, quantity);
    // - we want to fetch a response* from await: commercejs*
    // so what are we going to add here in the parenthesis: cart.add();?
    // we are going to add the productId!
    // So we are going to use this 2 params:
    // (productId, quantity) to require data to the API commercejs

    //
    // update our cart **
    setCart(cart);
    //
    //
  };

  //--------------------------------------
  // Handle Update Cart Quantity
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    // we put  {quantity} in an object because its just 'one of the things' we want to update

    // update our cart **
    setCart(cart);
    //
    //
  };
  //
  //
  // HANDLE REMOVE CART
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    // update our cart **
    setCart(cart);
    //
    //
  };
  //
  //
  // HANDLE EMPTY CART
  // this function doesnt need any params, as it just removes the cart
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    // update our cart **
    setCart(cart);
    //
    //
  };
  //--------------------------------------

  useEffect(() => {
    fetchProducts();
    fetchCart();
    //
  }, []);
  //
  // console.log(cart);
  //
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          {/* ----- */}
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
