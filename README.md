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

# 🧺 🍌 \_\_ :shopping_cart:

## Creating products with Commerce.js

<br>

- This is the continuation of **creating-products-with-commercejs-adding-dynamic-button-add-to-basket**

[<img src="/src/img/finally_adding_items_to_the_basket.gif"/>]()

<br>

### Now we have to create the layout for the cart

- It will be the page where the user will be redirected to see the products in the basket

1:01

<br>
<br>
<br>

### Inside the components folder

- create a new folder and call it: **Cart**
- Inside of the Cart, create a **Cart.jsx** file
- Once you are there, type: rafce

<br>

- Import the following:

```javascript
import React from "react";
// import the following
import { Container, Typography, Button, Grid } from "@material-ui/core";

//
//
//
const Cart = () => {
  return <div></div>;
};

export default Cart;
```

<br>

### Before start adding Content, lets wrap everything

```javascript
const Cart = () => {
  return(
    <Container>
    // content
   <div className={classes.toolbar} />
  //
    </Container>;
  )
};

export default Cart;
```

### the classes toolbar

- as you see, its a self closing tag, this div is used to make space from top of something, some sort of separation, like we did in the navbar.

<br>

### Add the following variable to use in the If statement

- This **variable** will display different content based on that

> const isEmpty = true;

### Add all the following and read comments if there is any:

```javascript
// by default the cart is EMPTY
  const isEmpty = true;
  //
  //
  return (
    <Container>
      <div className={classes.toolbar} />
      {/*
       */}

      <Typography className={classes.title} variant="h3">
        Your shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
      {/*
        the if is: ? , else are the 2 dots after <EmptyCard />
      If the variable is EMPTY show this <EmptyCard /> : else show this <FilledCart/>

      */}
    </Container>
  );
};

export default Cart;
```

<br>

### Now create the 2 Sub Components:

```javascript
 <EmptyCart />
 <FilledCart/>
```

<br>

```javascript
const Cart = () => {
  //
  //
  const isEmpty = true;
  // the following two functions are called sub components
  //
  //
  //So if the cart is EMPTY show the following:
  const EmptyCart = () => {
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!
    </Typography>;
  };
  //So if the cart is FILLED show the following:
  const FilledCart = () => {
    //  Here you will have to render the grid with all of the items
    <>

      <Grid container spacing={3}>
        {/* WHERE ARE GOING TO LOOP THROUGH OUR ITEMS HERE */}
      </Grid>

    </>
  };
  //
  //
  return (
```

<br>
<br>

### Before we continue with the Grid content

- Import the cart Logic (with the products when they are added) from the App.js, To the Cart.jsx **via Props**

<br>

### App.js

### Since we already have our cart in the state, the only thing we have to do, is to add it below the <Products.

- <u> the following</u> inside the App.js

- Then **once its hidden**, add the <Cart

> **The hidden line, will stay like that until** we implement the routes (so that we can navigate through the products).

<br>

```javascript
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
```

### Now import the Cart component to the top and also inside the index.js

```javascript
// App.js
import { Navbar, Products, Cart } from "./components";
//
// Components/index.js
export { default as Navbar } from "./Navbar/Navbar";
export { default as Products } from "./Products/Products";
export { default as Cart } from "./Cart/Cart";
```

<br>

### Now you can pass the Cart inside the <u>Cart.jsx</u>

```javascript
const Cart = ({cart}) => {
```

<br>
<br>

#### 🔴 err 1.

#### At this point we have this error

- And its because, before the importing the Cart in the App.js **we were using the line we hid**, this line contained **styles**, and from the moment we added the new one, react realized it no longer had it.

```javascript
Failed to compile.

./src/components/Cart/Cart.jsx
Module not found: Can't resolve '*.module.css' in '/home/dci-st119/Documents/3D-UNITY-BLENDER-REACTVR-ALL/A_REACT_interme/ecommmerce-shop-react-stripe/src/components/Cart'

```

#### The above error is related to the styles

- CREATE A STYLE FILE styles.js and fill it with this then add it to the Cart.jsx like we have been doing for the all the others(Products for example)

#### [check the solution here](./src/errors.md)

<br>
<br>
<br>
<br>

#### 🔴 err 2. This one was a bit harder but useful to understand:

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
  //
  //
  //
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

#### [check the solution here](./src/errors.md)

<br>

# 🍾 Problem solved

- I can now see the Layout that i just created

[<img src="/src/img/shopping_cartLAYOUT1.jpg"/>]()

<br>
<br>
<br>

# 🍪

### Lets go back to this and review a couple of things:

- Why this line is there?

1:06:52

> Well its the only way for us to know, **IF THE CART IS EMPTY**

```javascript
//1   const isEmpty = cart.line_items.length = 0;
// This means our car is empty
//
// 2
// So if the cart is empty is = 0 is 'falsy', so no false '!0' is = to true and we get EMPTY. So if cart.line_items.length is anything else other than 0, like 5 or 10 etc, is truthy!!!
// So if we have ! no true here is false.
// So if the car length is not empty, show is filled but for that we need the if statement after the line below:
const isEmpty = !cart.line_items.length;
//

//if the cart 'isEmpty' show <EmptyCart />
// else :
// show this <FilledCart />
{
  isEmpty ? <EmptyCart /> : <FilledCart />;
}
```

<br>

#### So moving on: we said that we have to LOOP in the cart right here

<br>

- The reason why we open an () istead of a curly brackets **(item) => (**, is to have an
  **instantaneous render**

    <br>

```javascript
//So if the cart is FILLED show the following:
const FilledCart = () => (
  <>
    <Grid container spacing={3}>
      {cart.line_items &&
        cart.line_items.map((
          item //here ***
        ) => (
          // So for each product we want to show a Grid
          // this is how big it will be depending on the device, mobile etc : xs={12} sm={4}
          <Grid item xs={12} sm={4} key={item.id}>
            // This is why we only see the name of the product in the first test
            (look in the image above)
            <div>{item.name}</div>
          </Grid>
        ))}
    </Grid>
  </>
);
```

#### Below the Grid we are going to implement another div

- This will give us the amount with the **dollar SIGN**:
  > {cart.subtotal?.formatted_with_symbol}

```javascript
<div className={classes.cardDetails}>
  <Typography variant="h4">
    {/* with symbol, is going to give us the amount with the dollar sign */}
    Subtotal: {cart.subtotal?.formatted_with_symbol}
  </Typography>
</div>
```

#### Now add the buttons

```javascript
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
```

<br>
<hr>
<br>

# 🐒

# His method to solve the err.2 🔴

- He explains that the error is due to the fact the line **!cart.line_items.length** wasnt Fetch jet.

min: 1:12:56

```javascript

TypeError: Cannot read property 'length' of undefined
Cart
src/components/Cart/Cart.jsx:11
   8 | //
   9 | const classes = useStyles();
  10 | //
> 11 | const isEmpty = !cart.line_items.length;


```

- He said that to solve the problem we only have to add this:

```javascript
if (!cart.line_items) return "Loading...";
```

- But that if we will still get an error due to the fact that this line is still happening: **!cart.line_items.length**

### He said that we might not need a variable, so he deleted it from the top and added the it in the if statement on the bottom :

```javascript
if (!cart.line_items) return "Loading...";
```

- He said that sometimes we dont need to create a variable if the content is meaningful enough on its own

### SO NOW, this line:

```javascript
{
  !cart.line_items.length ? <EmptyCart /> : <FilledCart />;
}
```

### IS NOT going to happpen before this line:

```javascript
// so if there is not cart items, its going to send a messages "loading"
if (!cart.line_items) return "Loading...";
```

<br>

#### the code before we continue with the next part

```javascript
import React, { useEffect } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";
//
//
const Cart = ({ cart }) => {
  //

  //   const isEmpty = !(cart.line_items && cart.line_items.length);
  //   //

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
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            {/* <CartItem /> */}
            <div>{item.name}</div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          {/* with symbol, is going to give us the amount with the dollar sign */}
          Subtotal: {cart.subtotal?.formatted_with_symbol}
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
  //   useEffect(() => {
  //     console.log(cart);
  //   }, [cart]);

  //
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h3">
        Your shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      {/*
        the ? stands for 'if' , the : dots stands for 'else'  
      If the variable is EMPTY show this <EmptyCard /> : else show this <FilledCart/>
      
      */}
    </Container>
  );
};

export default Cart;
```

<br>
<hr>
<br>
<br>

# :shopping_cart:

## CREATE THE <u>Cart Item </u> Component

- Inside the **Cart folder**, create a **CartItem folder**
  <br>

###### But why did we create the **CartItem folder** inside the **Cart folder** and not inside the **components folder**?

- Its just a question of organization, since the **CartItem folder** is only going to be used inside the **Cart folder** , so it doesnt make sense to be somewhere else.

<br>

#### LETS CREATE THE: CartItem.jsx

min: 1:14:57

- import the following:

```javascript
import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

//
//
//
import useStyles from "./styles";
//
//

const CartItem = () => {
  // hook styles
  const classes = useStyles();

  return (
    <>
      <div>hello</div>
      <div>hello</div>
    </>
  );
};

export default CartItem;
```

<br>

### Add the image

```javascript
return (
  <>
    <Card>
      {/* This is the image of a specific product */}
      <CardMedia image={CartItem.media.source} />
    </Card>
  </>
);
```

### Once you do that, go to the Cart.jsx and replace the following:

- But before, import the freshly created component:
- import CartItem from './CartItem/CartItem'

```javascript
// Replace this:
<Grid container spacing={3}>
  {cart.line_items.map((item) => (
    <Grid item xs={12} sm={4} key={item.id}>
      <div>{item.name}</div> //***** REPLACE THIS *******
    </Grid>
  ))}
</Grid>

// For this:      {/* <CartItem /> */}
<Grid container spacing={3}>
  {cart.line_items.map((item) => (
    <Grid item xs={12} sm={4} key={item.id}>
          <CartItem />
    </Grid>
  ))}
</Grid>
```

<br>

#### Include the item={item} to the CardItem like so:

```javascript
<CartItem item={item} />
```

<br>
<br>

### Now make the connection through PROPS

#### Go to the CartItem file and pass the props

```javascript
const CartItem = ({ item }) => {
```

- then add this in the same file:

```javascript
<>
  <Card>
    {/* This is the image of a specific product */}
    <CardMedia image={item.media.source} />
  </Card>
</>
```

<br>
<br>

### You will get this error 🔴

```javascript
TypeError: Cannot read property 'source' of undefined
CartItem
src/components/Cart/CartItem/CartItem.jsx:28
  25 |   <>
  26 |     <Card>
  27 |       {/* This is the image of a specific product */}
> 28 |       <CardMedia image={item.media.source} />
     | ^  29 |     </Card>
  30 |   </>
  31 | );
```

> **The reason:** is because **source** is deprecated

### Since I already solved this "image" issue i only had to replace certain things:

```javascript
// Replace this:
<>
  <Card>
    {/* This is the image of a specific product */}
    <CardMedia image={item.media.source} />
  </Card>
</>


// For this
    <>
      <Card>
        {/* This is the image of a specific product */}
        <CardMedia image={item.image.url} />
      </Card>
    </>
```

### image.url is the same i am using inside the Products.jsx

- image={product.image.url}

1:16:55

#### Also dont forget to add the alt to the img

```javascript
 alt={item.name}
      className={classes.media}
```

<br>
<br>

#### Now lets add the rest of the content

- We will handle the name and the price of the products
- We will also add how many items we have in the basket

```javascript
<>
  <Card>
    {/* This is the image of a specific product */}
    <CardMedia
      image={item.image.url}
      alt={item.name}
      className={classes.media}
    />
    {/*  Card Content*/}
    <CardContent className={classes.CardContent}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography variant="h5">
        {item.line_total.formatted_with_symbol}
      </Typography>
    </CardContent>
    {/* Car actions */}
    <CardActions className={classes.CardActions}>
      <div className={classes.buttons}>
        <Button type="button" size="small">
          -
        </Button>
        // so here we are going to see what is the current quantity of our item
        <Typography>{item.quantity}</Typography>
        <Button type="button" size="small">
          +
        </Button>
      </div>
      {/* This is going to be the item that is going to 
          remove it completely from the card */}
      <Button type="button" color="secondary">
        Removes
      </Button>
    </CardActions>
  </Card>
</>
```

1:19:30
