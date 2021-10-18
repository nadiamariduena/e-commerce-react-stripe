<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
[<img src="/src/img/undefined_first_commerceTests_beforeAdding-Products.jpg"/>]()
<br>

#### [NOTES : interesting](./src/Interesting.md)

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

<br>

## Make the icon Cart redirect the user to that path

- **Go to the NAVBAR**

- **Import the following**

```javascript
import { Link } from "react-router-dom";
```

### then wrap the icon of the navbar with this:

- Here we have the path **/** cart, this means that from the moment we will click, it will redirect us to **/cart**

```javascript
<Link to="/cart"></Link>
```

### basic way of wrapping a button

```javascript
<Link to="/cart">
  <IconButton aria-label="Show cart items" color="inherit">
    <Badge badgeContent={totalItems} color="secondary">
      {/* ShoppingCart  is the icon */}
      <ShoppingCart />
    </Badge>
  </IconButton>
</Link>
```

<br>

### But since we are working with material UI we can do it in the following way:

```javascript
<IconButton
  component={Link}
  to="/cart"
  aria-label="Show cart items"
  color="inherit"
>
  <Badge badgeContent={totalItems} color="secondary">
    {/* ShoppingCart  is the icon */}
    <ShoppingCart />
  </Badge>
</IconButton>
```

### You have to add the same here too:

```javascript
<Typography
  component={Link}
  to="/cart"
  variant="h6"
  className={classes.title}
  color="inherit"
>
  <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
  Nadia Mariduena
</Typography>
```

### Result

[<img src="/src/img/routes2.gif"/>]()

1:25:54

<br>
<br>

#### What we are going to do next, Is to remove the icon cart if we are already in the cart page:

- For that we will need something called **useLocation**

```javascript
import { Link, useLocation } from "react-router-dom";
```

##### pass the hook inside the navbar component

```javascript
const Navbar = ({ totalItems }) => {
  //
  const classes = useStyles();
  const location = useLocation();
```

- That location has an specific property that we need, and that property is called pathName

> We want to check **if** location pathname is equal to **'/'** which is our welcome page, **only then** you will show the icon image but if we are already inside the **cart page dont show it**

```javascript
if (location.pathname === '/')
```

#### This is how we will implement in the button

```javascript
{
  location.pathname === "/" ? (
    <div className={classes.button}>
      <IconButton
        component={Link}
        to="/cart"
        aria-label="Show cart items"
        color="inherit"
      >
        <Badge badgeContent={totalItems} color="secondary">
          {/* ShoppingCart  is the icon */}
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  );
}
```

<br>

```javascript
{ //here we are saing: if this exist:
  location.pathname === "/" ? ( //then do this(show the button content), because / is the welcome page!!
```

<br>

### but in react there is a better way: use this && instead of ?

- The **&& and and operator** is saying: this is only going to appear if the first part is true

```javascript
{ //here we are saing: if this exist:
  location.pathname === "/" && ( //then do this(show the button content), because / is the welcome page!!
```

<br>
<br>

```javascript
{
  location.pathname === "/" ? (
    <div className={classes.button}>
      <IconButton
        component={Link}
        to="/cart"
        aria-label="Show cart items"
        color="inherit"
      >
        <Badge badgeContent={totalItems} color="secondary">
          {/* ShoppingCart  is the icon */}
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  );
}
```

[<img src="/src/img/routes3_location_pathname.gif"/>]()

<br>
<br>

### An option (in case there s no items from a certain product )

- GO TO Cart.jsx

> **Right now we have a text**: You have not items...

```javascript
const EmptyCart = () => {
  <Typography variant="subtitle1">
    You have no items in your shopping cart, start adding some!
  </Typography>;
};
```

### import the Link

```javascript
import { Link } from "react-router-dom";
```

#### Implement it like so:

```javascript
// the following two functions are called sub components
//So if the cart is EMPTY show the following:
const EmptyCart = () => {
  <Typography variant="subtitle1">
    You have no items in your shopping cart,
    <Link to="/" className={classes.link}>
      {" "}
      start adding some
    </Link>!
  </Typography>;
};
```

#### Right now we cannot see the result because we still need to finish the following buttons: increase +, decrease -, remove.

1:29:00

<br>
<br>
<hr>
<br>

# 🍌

# Buttons

- Lets start by updating the quantity of a specific product

<br>

#### APP.JS

- If you notice, in the App.js we have:

```javascript
const [cart, setCart] = useState([]);
```

- This is going to help us to set up the function that will handle the quantity update

<br>

### Below the HandleToCart fetch function add the following:

```javascript
//
// Handle Update Cart Quantity
const handleUpdateCartQty = async (productId, quantity) => {
  const response = await commerce.cart.update(productId, { quantity });
  // we put  {quantity} in an object because its just 'one of the things' we want to update

  // update our cart **
  setCart(response.cart);
  //
  //
};
```

<br>

### Instead of <u>response</u> we can immediately restructure the cart

- So that we dont need to use it twice

<br>

- **This is how we have it now**

<br>

```javascript
const handleAddToCart = async (productId, quantity) => {
  const item = await commerce.cart.add(productId, quantity);
  setCart(item.cart);
};

//
// Handle Update Cart Quantity
const handleUpdateCartQty = async (productId, quantity) => {
  const response = await commerce.cart.update(productId, { quantity });
  setCart(response.cart);
};
```

<br>

- **After the changes**

```javascript
const handleAddToCart = async (productId, quantity) => {
  const { cart } = await commerce.cart.add(productId, quantity);
  setCart(cart);
};

//
// Handle Update Cart Quantity , this will accept 2 args
const handleUpdateCartQty = async (productId, quantity) => {
  const { cart } = await commerce.cart.update(productId, { quantity });
  setCart(cart);
};
```

<br>
<br>

### Lets Continue with the next function: the HANDLE REMOVE CART

```javascript
// HANDLE REMOVE CART
const handleRemoveFromCart = async (productId) => {
  const { cart } = await commerce.cart.remove(productId);
  // update our cart **
  setCart(cart);
  //
  //
};
```

<br>
<br>

### Let's Continue with the next function: the HANDLE EMPTY CART

```javascript
// this function doesn't need any params, as it just removes the cart
const handleEmptyCart = async () => {
  const { cart } = await commerce.cart.empty();
  // update our cart **
  setCart(cart);
  //
  //
};
```

<br>
<br>
<br>

### Now we need to pass these 3 new functions to where we can CALL them

```javascript
// App.js
<Route exact path="/cart">
  <Cart
    cart={cart}
    handleUpdateCartQty={handleUpdateCartQty}
    handleRemoveFromCart={handleRemoveFromCart}
    handleEmptyCart={handleEmptyCart}
  />
</Route>
```

### After that, we need to use them inside the Cart.jsx

```javascript
//
//
const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  //
```

<br>

### Where do we pass them now?

- **1 of them can be called here inside the Cart.jsx**

```javascript
<Button
  className={classes.emptyButton}
  size="large"
  type="button"
  variant="contained"
  color="secondary"
  onClick={handleEmptyCart}
>
  Empty cart
</Button>
```

<br>

- **the other 2 can be called inside the CartItem.jsx** so you will pass it again one level under **as PROPS**, but before that you need to prepare them here inside the **Cart.jsx**

```javascript
// Carts.jsx
<Grid item xs={12} sm={4} key={item.id}>
  <CartItem
    item={item}
    onUpdateCartQty={handleUpdateCartQty}
    onRemoveFromCart={handleRemoveFromCart}
  />
</Grid>
```

<br>
<br>

#### Now they are ready to be passed as PROPS to the CartItem.jsx

```javascript
//CartItem.jsx
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  //
  //
  //
```

<br>

### And here is where you will add it

```javascript
       </CardContent>
        {/* Car actions */}
        <CardActions className={classes.CardActions}>
          <div className={classes.buttons}>
            //
            //
            //
            <Button
              type="button"
              size="small"
              // - 1 , because you only want to delete 1 at the same time, not in packs of 3 for example
              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            //
            //
            //
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
            //
            //
            //
          {/* This is going to be the item that is going to
          remove it completely from the card */}
          <Button
            type="button"
            color="secondary"
            onClick={() => onRemoveFromCart(item.id)}
          >
            Removes
          </Button>
        </CardActions>
```

<br>

#### RESULT

- **Its working**!!!!!ddB

1:37:27

<br>
<br>
<br>

### THE TEACHER tells that if we are using PROPS too much, the solution for it, is React Context

- But he is not going to use it in this project because we dont have many functions.
