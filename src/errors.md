### Commun errors

##### Most of errors are related to the styles

- I got this error when i just started the Cart,jsx, when passing the **PROPS** cart to create the dynamic button.

<br>
 
## 🔴 err 1.

#### At this point we have this error

- And its because, before importing the Cart in the App.js **we were using the line we hid**, this line contained **styles**, and from the moment we added the new one, react realized it no longer had styles

#### the line we hid in the App.js

```javascript
<Products products={products} onAddToCart={handleAddToCart} />
```

<br>

- the styles we were already using for this:

<br>

```javascript
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h3">
```

<br>

### So that its the reason we got the error here below:

```javascript
Failed to compile.

./src/components/Cart/Cart.jsx
Module not found: Can't resolve '*.module.css' in '

```

<br>
<br>
<br>

## SOLUTION

- **CREATE A STYLE FILE** styles.js and fill it with this:

```javascript
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
}));
```

<br>

## Now export the styles data, and REQUIRE them inside the Cart.jsx

```javascript
// Cart.jsx
// here ---
import useStyles from "./styles";
//
//
const Cart = ({ cart }) => {
  //
  //
  // Pass the hook STYLES like this:
const classes = useStyles();
```

<br>
<br>
<br>
<br>
<hr>
<br>

## ERROR 2. 🔴

```javascript
TypeError: Cannot read property 'length' of undefined
Cart
src/components/Cart/Cart.jsx:11
   8 | //
   9 | const classes = useStyles();
  10 | //
> 11 | const isEmpty = !cart.line_items.length;
     | ^  12 | //
  13 | //
  14 | // the following two functions are called sub components
```

<br>

### After exporting the Cart.jsx

- Inside the App.js

```javascript
import { Products, Navbar, Cart } from "./components";
//
//
{
  /* <Products products={products} onAddToCart={handleAddToCart} /> */
}
<Cart cart={cart} />;
```

### And then adding the following in the Cart.jsx:

```javascript
import useStyles from "./styles";
const Cart = ({ cart }) => {
  // step 1 reason of the error
  const isEmpty = !cart.line_items.length;
  //
  const classes = useStyles();
  //
  const EmptyCart = () => {
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!
    </Typography>;
  };
  //
  //

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        //step2. also here ************************* also problem because
        connected to the step 1
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <div>{item.name}</div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          // ------********* also ******** Subtotal:{" "}
          {cart.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  //

  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h3">
        Your shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};
```

<br>
<br>

#### 🔴 I got this error

```javascript
TypeError: Cannot read property 'length' of undefined
Cart
src/components/Cart/Cart.jsx:11
   8 | //
   9 | const classes = useStyles();
  10 | //
> 11 | const isEmpty = !cart.line_items.length;
     | ^  12 | //
  13 | //
  14 | // the following two functions are called sub components
```

<br>
<br>

## After looking for an answer i found this:

[Cannot find the error in React application](https://stackoverflow.com/questions/67615113/cannot-find-the-error-in-react-application)

### Explanation:

> The issue with your code is that **the initial state doesn't match what you access on the initial render**.

1. **In App** component the cart state is just an empty object.

```javascript
const [cart, setCart] = useState({});
```

> **cart** is passed as a _prop_ to **Cart** component and the code assumes <u>cart.line_items</u> is defined in order to access a **length** property or **map** function. cart.

**line_items** is OFC(of course) undefined **so attempting to access the length property (or map) throws the TypeError:** Cannot read property 'XYZ' of undefined

```javascript
const isEmpty = !cart.line_items.length;
```

and

```javascript
cart.line_items.map(.....
```

> but when I console.log it out in App.js, it actually does print out the necessary information.

<br>

> **The console.log(cart); is in the function body of the component so it's incorrectly logging the cart state** as an unintentional side-effect, it should be logged from a useEffect hook so you see the value per render cycle. **The other issue here is that you aren't accessing any nested properties so this will never throw an error.** I'd be willing to bet that with this code you have at least 1 or 2 logs entires that are just empty objects ({}) and then you see some logs with populated nested properties.

<br>
<br>

### Solutions

> Regarding the state logging, **you should use an useEffect hook with a dependency on the state value you are logging**. This will log the cart state on the initial render and later only when the cart state value is updated.

```javascript
useEffect(() => {
  console.log(cart);
}, [cart]);
```

#### For the error, you've several options to help guard against errors when accessing your cart state.

### 1.

> Provide valid initial state that matches what is accessed during the render cycle, add **line_items: []** to the initial **cart state** . <u>such that **cart.line_items will now exist** and have a **length** property</u>

```javascript
const [cart, setCart] = useState({ line_items: [] });
```

#### 2. Use a guard clause or Optional chaining on the passed cart prop.

```javascript
const isEmpty = !(cart.line_items && cart.line_items.length);
```

#### or

```javascript
const isEmpty = !cart.line_items?.length);
```

#### and

```javascript
cart.line_items && cart.line_items.map(.....
```

#### or

```javascript
cart.line_items?.map(.....
```

##### May as well guard the subtotal sub-state as well in the case that cart.subtotal isn't defined.

```javascript
<Typography variant="h4">
  Subtotal: {cart.subtotal?.formatted_with_symbol}
</Typography>
```

<br>

[Cannot find the error in React application](https://stackoverflow.com/questions/67615113/cannot-find-the-error-in-react-application)

<br>
<br>
<br>

### Concerning this important part: Also inside the Cart.jsx

```javascript
if (!cart.line_items) return "Loading";
```

[TypeError: Cannot read property 'length' of undefined in Commerce JS when accessing cart](https://stackoverflow.com/questions/65422330/typeerror-cannot-read-property-length-of-undefined-in-commerce-js-when-access)

#### Explanation:

- This is happens because **cart content doesnt load from e-commerce api immediately** when page open and then because of the error it stuck like that.

<br>

- You can first check is there a cart content first, and delete isEmpty variable and just write in javascript closure

```javascript
if (!cart.line_items) return "...loading";

return (
  <div className={classes.toolbar}>
    <Typography className={classes.title} variant="h3">
      {" "}
      Your Shopping Cart
    </Typography>
    {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
  </div>
);
```

<br>
<br>

### So I tried to follow all the steps from both links to make it work:

- This is the Cart.jsx after changes:

```javascript
import React, { useEffect } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";
//
//
const Cart = ({ cart }) => {
  //
  // NEW *** check the explanation in the error file
  const isEmpty = !(cart.line_items && cart.line_items.length);
  //

  const classes = useStyles();
  //
  // the following two functions are called sub components
  //So if the cart is EMPTY show the following:
  const EmptyCart = () => {
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!
    </Typography>;
  };
  //
  //
  //So if the cart is FILLED show the following:
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        // NEW *** check the explanation in the error file
        {cart.line_items &&
          cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              {/* <CartItem /> */}
              <div>{item.name}</div>
            </Grid>
          ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          {/* with symbol, is going to give us the amount with the dollar sign */}
          // NEW *** check the explanation in the error file// Subtotal: {cart.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  //important  // NEW *** check the explanation in the error file
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h3">
        Your shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
```

# 🐼

## SUCCESS!!! ... for now!
