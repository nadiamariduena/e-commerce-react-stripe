<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
[<img src="/src/img/undefined_first_commerceTests_beforeAdding-Products.jpg"/>]()
<br>

# CREDITS:

Big thanks to **[Adrian Hajdin](https://github.com/adrianhajdin)** , for sharing this **Great tutorial** on how to set up an E-commerce store using: React | Commerce.js and Stripe. -->

<br>

- This is the continuation of **Cart.CartItem-buttons-increase-decrease-remove**

[<img src="/src/img/cartItem-buttons-increase-decrease-remove.jpg"/>]()

<br>
<br>
<br>

1:20:53

# Implementing the React Router 🦉

#### Before we make the buttons (increase, decrease, remove) functional, we have to implement the react router.

- As we need to be able to comeback to the main page or other pages in the website.

> **React Router** is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

<br>

- **If you remember, we commented the products page** so that we could work on the Cart page?

```javascript
{
  /* <Products products={products} onAddToCart={handleAddToCart} /> */
}
<Cart cart={cart} />;
```

<br>

### That's why we need React Router

- In most of apps , react router is either in the App.js or inside the Index.js (**src folder**)

#### START by importing the following inside the App.js:

```javascript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
```

<br>

# Switch

> **Switch determines the start and end of the block or condition.** Each Route checks for the current path. supposing we were working on "www.test.com". All of "www.test.com" is the root **"/"**. So the Route checks for the path after the root. so if you had "www.test.com/home", "/home" comes after the root so the "Home" component will be loaded in our example above and if you had "www.test.com/about" the "About" component is loaded.

#### [What exactly is <switch> used for in React Router?](https://stackoverflow.com/questions/60136028/what-exactly-is-switch-used-for-in-react-router)

<br>

### Now wrap the application like so:

```javascript
return (
  <Router>
    <div>
      <Navbar totalItems={cart.total_items} />
      //
      <Switch>
        <Products products={products} onAddToCart={handleAddToCart} />
        <Cart cart={cart} />
      </Switch>
    </div>
  </Router>
);
```

## Create the Routes

- **What is route in react Router**?

> **Routing is a process in which a user is directed to different pages based on their action or request**. ReactJS Router is mainly used for developing Single Page Web Applications. React Router is used to define multiple routes in the application.

<br>

#### So _products_ is going to be our initial path, the welcome page of this project

```javascript
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
          <Cart cart={cart} />
        </Route>
      </Switch>
    </div>
  </Router>
);
```

<br>

#### Result: we are back to our welcome page

[<img src="/src/img/react_router1.jpg"/>]()
