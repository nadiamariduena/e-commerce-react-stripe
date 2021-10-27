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

## 🔴 Error 5. "Image issue after deleting product in commercejs"

- Problem solved in chrome but persist in firefox

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

# 🍌

# SOLUTION

```javascript
// BEFORE
<CardMedia image={item.media.url} alt={item.name} className={classes.media} />
//
// // AFTER
// CartItem.jsx
<CardMedia  image={item.image.url} alt={item.name} className={classes.media} />
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

## FIREFOX ISSUE 🔴

##### 3 days after i apparently solved the issue i decided to delete a product again to see if the problem persisted and once again i had the same issue

<br>

- I am still not 100% sure of what causes it because even if i have the correct data in those 2 files I am always encountering this issue when i delete a product

### Today i realized that the mistake also appears when I dont empty the basket with the product i deleted (Obvious) , after that the images worked again, but i then i decided to test it in firefox and the problems is still there

## OPERA ✅

## CHROME ✅

<br>
<br>
<br>
<br>
<hr>
<br>

<br>

# 🔴 ERROR 6.

### TOKEN ISSUE (related to countries)

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

<br>
<br>

<br>

## Cannot read property 'id' of null, is UNDEFINED

- That means that the following:

```javascript
// 1
const AddressForm = ({ checkoutToken }) => {
//
//
// 2
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

```

#### So we should ask ourselves, are we not including it correctly?

- How are we passing it inside the Checkout.jsx:

```javascript
const [checkoutToken, setCheckoutToken] = useState(null);
//
//----------- Here we will create the TOKEN -----
//
const [activeStep, setActiveStep] = useState(0);
const classes = useStyles();
//

//----------- Here we will create the TOKEN -----
//
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });

      setCheckoutToken(token);
    } catch {}
  };
  // calling the function, read the readme for this branch
  generateToken();
}, [cart]);
//

const Confirmation = () => <div>Confirmation</div>;
//
//passing the token to the addressForm.jsx
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );
//
//
```

<br>

#### Everything seems okay, so the problem must to be something else.

<br>

### 🔴 But what we have to do inside the Checkout.jsx:

- IS TO MAKE the **update dynamically** with the **cart**:

<br>

```javascript
//----------- Here we will create the TOKEN -----
//
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });

      setCheckoutToken(token);
    } catch {}
  };
  //
  generateToken();
}, [cart]); // update dynamically** with the **cart** 👍
//
//
```

<br>

#### So as soon the [cart]); changes, we have to recall for another token

[<img src="/src/img/error_checkOut_TOKEN_countries1.gif"/>]()

<br>
<br>
 
 #### Now lets check in the browser if that was the issue

### 🔴 The error persists

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

<br>

#### Lets console,log the 'token' one more time, to see if its being generated:

```javascript
// Checkout.jsx
      console.log(token);

        setCheckoutToken(token);
      } catch {}
    };
  //
```

<br>

### Back to the browser console, it seems like we do get the token

- But the it looks like the problem starts before we get the token,

- Because

```javascript
{id: "chkt_3wpN13dZ8y04Z5", cart_id: "cart_roEkjJVa8jb2Vl", created: 1634981205, expires: 1635586005, conditionals: {…}, …}
```

[<img src="/src/img/error_checkOut_TOKEN_countries2.gif"/>]()

<br>

#### if you notice when you scroll up in the list of errors, our token is in the middle, so the problem is starting before it.

- Because it tries to render the **AddressForm**

```javascript
The above error occurred in the <AddressForm> component:

    at AddressForm (http://localhost:3000/static/js/main.chunk.js:1060:3)
    at Form
    at div
    at Paper (http://localhost:3000/static/js/vendors~main.chunk.js:21846:23)
```

<br>

- **while** we still **dont have the token** and it depends on it

[<img src="/src/img/error_checkOut_TOKEN_countries3.gif"/>]()

<br>
<br>

### SO what is happening is the following:

- The following is the **RENDER** method as we know,

```javascript
// Checkout.jsx
//
return (
  <>
    <div className={classes.toolbar} />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {/* stepper 3. */}
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/*  */}

        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  </>
);
```

<br>

## 🌞

### So how react component works?, is that they first render everything:

1. React will render the **JSX** which is the code above inside the return, **at first**.

<br>

2. **Then it will render** the component did mount, in this case the **useEffect**

<br>

3. and Then **re-renders** if it needs to.

<br>
<br>

#### SO in this case:

```javascript
// Checkout.jsx
//
return (
  <>
    <div className={classes.toolbar} />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {/* stepper 3. */}
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/*  */}

        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  </>
);
```

## at this point:

- We still didnt call the checkout token, so we still dont have it,

```javascript

  40 | useEffect(() => {
> 41 |   fetchShippingCountries(checkoutToken.id);
     | ^  42 | }, []);

```

<br>

- but our **AddressForm** is depending on it:

```javascript
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );
```

<br>

## 🌞

### SO in this case we are going to add 1 more check to this form:

- IN here, we are going to say:

> **if** we have the checkout token **and and** form

```javascript
: checkoutToken && <Form />
```

<br>

```javascript
  //
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  //
//
//
//
         {activeStep === steps.length ? <Confirmation /> : checkoutToken &&  <Form />}
        </Paper>
```

<br>

### This means that we need to have the checkoutToken and <u>ONLY</u> if we have it, <u>ONLY then render the form</u>

🌞

- So that when it will rend the JSX , we will not encounter the issue of not having the token, and that 'due to' the checkoutToken && <Form

#### Now the checkout is working again and we finally got the countries

- dont forget to console.log the countries

```javascript
    console.log(countries);

   setShippingCountries(countries);
 };
```

[<img src="/src/img/error_checkOut_TOKEN_countries4__SOLVED.gif"/>]()

<br>
<br>
<br>
<hr>
<br>

# 🔴 ERROR 7.

<br>

## 422 error linked to commercejs and stripe credentials

- I notice that **the cart did not refresh/empty** after I concluded the order and received the confirmation in the browser

<br>

#### So to be sure, I inspected the console and i saw this:

## Error '422' 🔴

```javascript
{code: 'incomplete_number', type: 'validation_error', message: 'Your card number is incomplete.'}code: "incomplete_number"message: "Your card number is incomplete."type: "validation_error"[[Prototype]]: Object
//
//
xhr.js:187 POST 422
//
 🚫 Validation/missing fields
index.js:1 payment.gateway: The selected payment.gateway is invalid.
```

> **important** I checked my email to see if i got an order confirmation but there was nothing, at the same time checked I if stripe was receiving something and yes there was something **(all the attempts to order)**, so i think what is happening is that **i am not doing the commercejs and stripe connection correctly.**

<br>

### Possible reasons:

- Since i am not using any real credit card, it can be that its not emptying the cart and all the stuff because of that.

<br>

### After reading a couple of solutions, I found the confirmation to my doubts, but at that moment i didnt know _I really really needed the credit card_

[Connecting Stripe with Commerce.js](http://support.commercejs.com/en/articles/579874-connecting-stripe-with-commerce-js)

[<img src="/src/img/solution_confirmation-issue.jpg"/>](http://support.commercejs.com/en/articles/579874-connecting-stripe-with-commerce-js)

<br>

# 🍊

# THE SOLUTION

### 1. I really needed to add a credit card inside the commercejs/ settings/ gateway to have the option to insert the stripe credentials

- To see the option to add the stripe credentials like in the video, as i said you need to add your credit card information exactly as its in the card, everything has to match **(i tried adding a fake name using the right card code and it didn't work, same for the country)**

<br>

- Here the card was accepted

[<img src="/src/img/commercejs_accepting_card_before_stripe_credentials.jpg"/>]()

<br>

### 2. Once you get the key box reserved to stripe credentials in commercejs :

- You have to be careful and choose the test version of the public test and the private test

```javascript
pk_test_-------- very long code;
```

<br>

### This are the 2 keys you will need to add inside the stripe box in <u>commercejs</u>

<br>

- Before i got them, I made **sure** I fully completed the merchant account in stripe.

<br>

#### Stripe /the 2 keys you will need to add in commercejs

[<img src="/src/img/stripe_credentials_has_to_be_in_testMode.gif"/>]()

<br>

#### 3. commercejs / add these 2 keys here:

[<img src="/src/img/commercejs_accepting_stripe_credentials1.jpg"/>]()

<br>

#### 4. NOW... Grab the last sandbox key , the one on the bottom (dont take the live)

```javascript
// The publishable key from COMMERCEJS
REACT_APP_CHEC_PUBLIC_KEY = pk_test_;
//
//
//
//
//
//  The publishable key from STRIPE
// this key MUST* be a: pk_test_ , if its a 'live', it will send an error
// this key is the one in the image above, the one in the first place (not the secret key)
REACT_APP_STRIPE_PUBLIC_KEY = pk_test_;
```

[<img src="/src/img/dotenv_accepting__credentials2.jpg"/>]()

<br>

### NOW YOU ARE READY TO GO

- turn off the the server in visual and relaunch it

<br>

#### Now Empty the basket and add new products, then order and send the confirmation, wait a couple of seconds until the email arrives, and if you didnt receive anything, check if you had the "email confirmation" notifications selected.

<br>

##### the email: client side

[<img src="/src/img/email_after_confirmation-clientside.gif"/>]()

<br>
<br>

### the email: The Merchant side

[<img src="/src/img/the_order_commercejs___success.gif"/>]()

<br>
<br>
<br>

# Interesting links:

#### [Handling errors](https://docs.commercelayer.io/developers/handling-errors#422-unprocessable-entity)

#### [FAQ](https://commercejs.com/docs/community/faq/)

<br>

- Things you will find in the FAQ

> **How I can start processing real payments?**

Once you have tested processing payments using either the test gateway or by using an integrated payment gateway in sandbox mode (if available), you can go live by using your public live keys and disabling the test gateway.
