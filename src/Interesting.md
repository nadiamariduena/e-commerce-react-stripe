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

# 🍊

# ANOTHER interesting thing that i have been wanting to know:

- How to hide certain information depending on the page i am:

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

<br>
<br>
<br>
<hr>
<br>

## Array conversion

> READ THE CODE

```javascript
import React, { useState, useEffect } from "react";
//
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
//
import { commerce } from "../../lib/commerce";

//
import FormInput from "./FormInput";
//
//
const AddressForm = ({ checkoutToken }) => {
  //

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  //
  /*

                ARRAY CONVERTER countries

*/
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  // console.log(countries);
  //
  /*

                ARRAY CONVERTER Subdivisions

*/
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  /*                  OPTIONS

                This is an array by default
                so no need for conversion

*/
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} ~ (${sO.price.formatted_with_symbol}) `,
  }));
  //
  console.log(options);
  //
  //-------------
  //
  //
  //
  //FETCH COUNTRIES
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    // we get the keys out of the countries with the help of the: Object.keys
    setShippingCountry(Object.keys(countries)[0]);
  };
  //
  //-------------
  //
  //
  //
  // FETCH SUBDIVISIONS
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    // plural
    setShippingSubdivisions(subdivisions);
    //1 we get the keys out of the subdivisions with the help of the: Object.keys
    // individual subdivision
    setShippingSubdivision(Object.keys(subdivisions)[0]); //2 and then we get the first element [0])
  };

  //-------------
  //
  //
  // FETCH OPTIONS
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  //
  //
  //
  //
  //
  // Countries
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  //
  //
  //Subdivisions
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  //
  // Options
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  //
  //
  //
  //
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address line 1" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
            {/* ------------ */}
            {/* ------------ */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
```

<br>
<br>
<br>
<hr>
<br>

# 🍍

## This line

```javascript
// sO: shipping Options
const options = shippingOptions.map((sO) => ({
  id: sO.id,
  label: `${sO.description} ~ (${sO.price.formatted_with_symbol}) `,
}));
```

### I was curious about the use of the "tilde ~" and the reason for that is that we didnt really use it at school so, i made a research about it

- So lets refresh the memory

<br>

### [JavaScript Tilde ~ (Bitwise Not operator)](https://wsvincent.com/javascript-tilde/)

> In JavaScript, the tilde **~ Bitwise NOT operator** is commonly **used right before an [indexOf()](https://www.w3schools.com/jsref/jsref_indexof.asp) to do a boolean check (truthy/falsy)** on a string.

> On its own, **indexOf()** returns the index number of a String object passed in.

<br>

## ALSO: [What is the "double tilde" (~~) operator in JavaScript?](https://stackoverflow.com/questions/5971645/what-is-the-double-tilde-operator-in-javascript)

> **That ~~ is a double NOT bitwise operator.**

**It is used as a faster substitute for Math.floor() for positive numbers.** It does not return the same result as Math.floor() for negative numbers, as it just chops off the part after the decimal (see other answers for examples of this).

<br>
<br>
<hr>
<br>

### [Introduction to Template Literals](https://flaviocopes.com/javascript-template-literals/)

Template Literals are a new ES2015 / ES6 feature that allows you to work with strings in a novel way compared to ES5 and below.

The syntax at a first glance is very simple, **just use backticks instead of single or double quotes**:

```javascript
const a_string = `something`;
```

> - They are unique because **they provide a lot of features that normal strings built with quotes do not**, in particular:

- they offer a great syntax to define multiline strings
- they provide an easy way to interpolate variables and expressions in strings
- they allow you to create DSLs with template tags (DSL means domain specific language, and it’s for example **used in React by Styled Components, to define CSS for a component)**

### Read more: [Introduction to Template Literals](https://flaviocopes.com/javascript-template-literals/)



<br>
<br>
<br>
<hr>
<br>

# 🍯

# DangerouslySetInnerHTML

### issue related to the < p > (instead of the actual text) that you see in the image

[<img src="/src/img/img_propertie_issue_solved.jpg"/>]()

- Before i forget, i also had to change this as well

```javascript
// from this:
<Typography gutterBottom variant="h5">
  {product.price}
</Typography>
//
// to this
<Typography gutterBottom variant="h5">
{product.price.formatted_with_symbol}
</Typography>

```

<br>

### Now lets solve the html issue

- REPLACE the following:

```javascript
// Description in Product.jsx
//change this
<Typography variant="body2" color="textSecondary">
  {product.description}
</Typography>
//
// __html: product you need double underscore
// For this:
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
          />

```

<br>

## ⚠️

## What is DangerouslySetInnerHTML

- Dangerously Set innerHTML,

**Improper use of the innerHTML can open you up to a cross-site scripting (XSS) attack.** Sanitizing user input for display is notoriously error-prone, and failure to properly sanitize is one of the leading causes of web vulnerabilities on the internet.

Our design philosophy is that it should be "easy" to make things safe, and developers should explicitly state their intent when performing “unsafe” operations. <u>The prop name dangerouslySetInnerHTML is intentionally chosen to be frightening, and the prop value (an object instead of a string) can be used to indicate sanitized data.</u>

After fully understanding the security ramifications and properly sanitizing the data, create a new object containing only the key \_\_html and your sanitized data as the value. Here is an example using the JSX syntax:

#### [Read more](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)

<br>

### [Set innerHTML vs dangerouslySetInnerHTML](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)

> The immediate effect of using innerHTML versus dangerouslySetInnerHTML is identical -- the DOM node will update with the injected HTML.

> However, behind the scenes when you use dangerouslySetInnerHTML it lets React know that the HTML inside of that component is not something it cares about.

> Because React uses a virtual DOM, when it goes to compare the diff against the actual DOM, it can straight up bypass checking the children of that node because it knows the HTML is coming from another source. So there's performance gains.

<br>
<br>
