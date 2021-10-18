### This project has helped me to lose my fear on hooks and props, so i certainly will be using it more in my future projects

## Passing Props and functions through it

<br>
<br>

### App.js

- setting the states and the important fetch functions
- Also passing the **onAddToCart={handleAddToCart}** to the children such as Products.jsx and Product.jsx

```javascript
import React, { useState, useEffect } from "react";
// KEY
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
const App = () => {
  //
  const [products, setProducts] = useState([]);
  //
  const [cart, setCart] = useState([]);

  //
  // The fetch PRODUCTS
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    // update our  data **
    setProducts(data);
  };
  //
  // The fetch  CART
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  //
  // The fetch HANDDLE TO CART
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
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
};

export default App;
```

<br>
<br>

### Products.jsx (parent)

- Grabing data from the Product.jsx, to add inside the Grid

```javascript
import React from "react";
import { Grid } from "@material-ui/core";
//
import Product from "./Product/Product";
// Here **
import useStyles from "./styles";
//
//
const Products = ({ products, onAddToCart }) => {
  //
  // Here **
  const classes = useStyles();
  //
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/*  */}
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            // onAddToCart={handleAddToCart} will pass the function so that in
            the next page component "Product.jsx" you can be able to add it to
            the button
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
```

<br>
<br>

### Product.jsx (children)

```javascript
import React from "react";
// Import few things from material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
//icon
import { AddShoppingCart } from "@material-ui/icons";
//styles HOOK

import useStyles from "./styles";

//
//
const Product = ({ product, onAddToCart }) => {
  //  styles HOOK
  const classes = useStyles();
  //
  //
  //---------------------
  // console.log(product);
  // return <div>test</div>;
  //---------------------
  //
  //
  //
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

        <CardContent>
          <div className={classes.cardContent}>
            {/* name */}
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            {/* price */}
            <Typography gutterBottom variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          {/*
          
          
          Description */}
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
          />
        </CardContent>
        {/* 
        
        CardActions  */}
        <CardActions disableSpacing className={classes.cardActions}>
          {/* ICON BUTTON ON CLICK */}
          <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
```

<br>
<br>
<hr>
<br>

#### ANOTHER interesting thing that i have been wanting to know how to do, is to hide certain information depending on the page i am:

- **UseLocation**

> We want to check **if** location pathname is equal to **'/'** which is our welcome page, **only then** you will show the icon image but if we are already inside the **cart page dont show it**

```javascript
if (location.pathname === '/')
```

#### This is how we will implement in the button

<br>

```javascript
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
// icons
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

//
import useStyles from "./styles";
import logo from "../../assets/commerce.png";
//
const Navbar = ({ totalItems }) => {
  //
  const classes = useStyles();
  const location = useLocation();
  //
  //
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Nadia Mariduena
          </Typography>
          {/* 
          
          */}
          <div className={classes.grow} />

          {location.pathname === "/" && (
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
          )}

          {/* 
        
          */}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
```

<br>
<br>
<br>
<hr>
<br>

#### How to get the data from the carts(when the user clicks on a product and add it to the basket), so that i shows how many products we have on the basket icon on top right corner?

- We are going to remove that and make the connection between the icon inside the navbar and the information inside the app.js, information that is related to the add the item to cart.

<br>

#### Go to the App.js

> Pass the following information as PROPS

```javascript
// This is going to simply be a number of items in the cart
<Navbar totalItems={cart.total_items} />
```

<br>

#### Now go to the NAVBAR and pass the Prop there

```javascript
const Navbar = ({ totalItems }) => {
```

<br>

#### REPLACE THIS

```javascript
// REPLACE THIS
   <Badge badgeContent={2} color="secondary">
  // FOR THIS
     <Badge badgeContent={totalItems} color="secondary">
```

[<img src="/src/img/finally_adding_items_to_the_basket.gif"/>]()
