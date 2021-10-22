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

<br>
<br>
<hr>
<br>
<br>

## 🔴 ERROR 3.

1:37:33

## - / + / remove buttons worked, The empty car not really (it gives me the following err)

```javascript
Error: EmptyCart(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.
▶ 19 stack frames were collapsed.
fetchCart
src/App.js:37
  34 | // The fetch related to the CART
  35 | const fetchCart = async () => {
  36 |   // so what we want do here? we want to fetch something
> 37 |   setCart(await commerce.cart.retrieve());
     | ^  38 |   // - we want to fetch a response* from await*
  39 |   //
  40 |   // update our cart **

```

<br>
<br>

## After repeating the tutorial twice (_from the moment he created the handle functions in the app.js_), I found few mistakes in his code.

<br>

- I just found that he made some errors when adding the name functions and that one of them didn't match the props he gave, also that the names didnt match the ones he gave in the video, but even after correcting it, the error persisted, then i realized that he renamed the **EmptyCar content function** and called it inside the **if statement** on the bottom (that wasn't in the lesson)

```javascript
// Before
const EmptyCart = () => {
//
{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}

  //Changed the brackets for parenthesis
  //
  //**********   SOLUTION    *************
  // After
const renderEmptyCart = () => (
  // Of course he had to called it there too:

     {!cart.line_items.length ? renderEmptyCart() : <FilledCart />}
```

<br>
<br>

### This is the whole code before the changes:

```javascript
import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
//

import { Link } from "react-router-dom";
//
import CartItem from "./CartItem/CartItem";
//
import useStyles from "./styles";
//
//
const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  //

  const classes = useStyles();
  //
  // the following two functions are called sub components
  //So if the cart is EMPTY show the following:
  const EmptyCart = () => {
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some
      </Link>!
    </Typography>;
  };
  //
  //
  //So if the cart is FILLED show the following:
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          // 4 = to 3 products on the desktop
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          {/* with symbol, is going to give us the amount with the dollar sign but if you set it up to euro in commercejs , it will show euro*/}
          Subtotal: {cart.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
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
  //   useEffect(() => {
  //     console.log(cart);
  //   }, [cart]);

  //
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      {/* gutterBottom is going to give something like a padding 60px ,wherever you place it   */}
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping Cart
      </Typography>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
```

<br>
<br>
<br>

# SOLUTION

```javascript
import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
//

import { Link } from "react-router-dom";
//
import CartItem from "./CartItem/CartItem";
//
import useStyles from "./styles";
//
//
const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  //

  const classes = useStyles();
  //
  // here ***

  // the following two functions are called sub components
  //So if the cart is EMPTY show the following:
  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">
        start adding some
      </Link>!
    </Typography>
  );
  //
  //
  //So if the cart is FILLED show the following:
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          // 4 = to 3 products on the desktop
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          {/* with symbol, is going to give us the amount with the dollar sign but if you set it up to euro in commercejs , it will show euro*/}
          Subtotal: {cart.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
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
  //   useEffect(() => {
  //     console.log(cart);
  //   }, [cart]);

  //
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      {/* gutterBottom is going to give a top height to wherever you place it */}
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping Cart
      </Typography>
      // here ***
      {!cart.line_items.length ? renderEmptyCart() : <FilledCart />}
    </Container>
  );
};

export default Cart;
```

<br>

[<img src="/src/img/result_buttons_success.gif"/>]()

### Now everything is working

<br>
<br>
<br>
<br>
<br>
<br>

# 🔴 Error 4.

1:57:00

```javascript
Failed to compile.

src/components/CheckoutForm/FormInput.jsx
  Line 9:23:   'useFormContext' is not defined  no-undef
  Line 14:6:   'Grid' is not defined            react/jsx-no-undef
  Line 22:16:  'isError' is not defined         no-undef

Search for the keywords to learn more about each error.
```

### Most of the errors in that phase were related to:

- Not naming correctly the functions or naming them differently to what is shown in the video tutorial.

##### this is the [official repo of the project](https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/CheckoutForm/CustomTextField.jsx) , where you can spot the differences.

<br>

- Another reason for errors: **changes or updates in the form dependency**

<br>

#### So here is the code BEFORE AND AFTER the changes (check also the import)

<br>

## BEFORE

```javascript
// before
import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
};

export default FormInput;
```

<br>

### AFTER

```javascript
import React from "react";
//
import { TextField, Grid, InputLabel } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  const isError = false;
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
        variant="outlined"
      />
    </Grid>
  );
};

export default FormInput;
```

<br>

### Result after changes

<br>

[<img src="/src/img/checkout4_formInput.gif"/>]()

<br>
<br>
<br>

## 🔴 Error 5.

#### This error appeared when i was trying to solve the _token_ error, in which i was trying to figure out why i couldnt see the country options.

```javascript
 25 | {/*  */}
  26 | {/* This is the image of a specific product */}
  27 | <CardMedia
> 28 |   image={item.media.url}
     | ^  29 |   alt={item.name}
  30 |   className={classes.media}
  31 | />
```

<br>

- After reading the solutions (apparently related to shipping options coming from the commercejs), i decided to delete the products and repeat the part of the tutorial **in the beginning**, when we just started adding the products to commercejs.

<br>

- **So after deleting and creating new products** to test the shipping issue, i got this new error, **i didnt understand why?** because it has been working really well with the following:

```javascript
// BEFORE
<CardMedia image={item.media.url} alt={item.name} className={classes.media} />
//
```

<br>

### So i started to look for clues, first i thought it had to do with the image format

<br>

- Then after reading the code again, i decided to hide just the image box to see if I could at least see the product(even without the picture)...

<br>

- I did that so to focus only in the image and related elements, like the **Product.jsx** that had also connection with the **CartItem.jsx**

<br>

[<img src="/src/img/error-after-delete-products-commercejs-1.gif"/>]()

<br>
<br>

#### After testing different things, i remembered that in the beginning i had to play with 3 words to see the image: media, src, and url, but importantly, i need that whatever i put it had to match the 2 files:

> **Product.jsx** and **CartItem.jsx**

<br>

- The Whole issue was strange, because the whole project has been working very well since the beginning, and just when i deleted the products from the commercejs dashboard, it caused the mess, but i am glad it happened now i know something more :)

[<img src="/src/img/error-after-delete-products-commercejs-2.gif"/>]()

 <br>
  <br>
   <br>

# SOLUTION

```javascript
// BEFORE
<CardMedia image={item.media.url} alt={item.name} className={classes.media} />
//
// // AFTER
// CartItem.jsx
<CardMedia image={item.media.url} alt={item.name} className={classes.media} />
```

<br>

#### and in _Product.jsx_

<br>

```javascript
 return (
   <>
     {/* self closing tag /> */}
     <Card className={classes.root}>
       {/* styles HOOK

       */}
       {/* img */}
       <CardMedia
         className={classes.media}
         image={product.image.url}
         title={product.name}
       />
```

<br>
<br>
<br>
<hr>
<br>

## 🔴 ERROR 6. 

### Token issue

```javascript
TypeError: Cannot read property 'id' of null
(anonymous function)
src/components/CheckoutForm/AddressForm.jsx:41
  38 | //
  39 |
  40 | useEffect(() => {
> 41 |   fetchShippingCountries(checkoutToken.id);
     | ^  42 | }, []);
  43 | //
  44 | //
```
