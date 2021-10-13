<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
<br>

# CREDITS:

Big thanks to **[Adrian Hajdin](https://github.com/adrianhajdin)** , for sharing this **Great tutorial** on how to set up an E-commerce store using: React | Commerce.js and Stripe. -->

# This is the second part of the tutorial (after the default setup)

# 👈

#### Few things to correct before we start with the Navigation Bar:

### 1. Add the return()

- One of the errors i got, was because the Products.jsx didn't have a return() wrapping the whole content of that file.(**like it should normally have**)

```javascript
  return (
    <main>
      <Grid container justify="center" spacing={4}>
```

<br>

### 2. Add the images to the Products.jsx

- Check min: 24:29 [ECommerce Web Shop - Build & Deploy an Amazing App | React.js, Commerce.js, Stripe](https://youtu.be/377AQ0y6LPA)

<br>

- This are just pre production images, just to visualize something

```javascript
const products = [
  {
    id: 1,
    name: "Ink Pen NM",
    description: "Running shoes",
    price: "$5",
    image:
      "https://images.unsplash.com/photo-1622901120958-ae569882629c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  },
  {
    id: 2,
    name: "Graphic card NM",
    description: "Apple macbook",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  },
];
//
// Product.jsx
<CardMedia
  className={classes.media}
  image={product.image}
  title={product.name}
/>;
```

<br>
<hr>
<br>
<br>

# 🍯 🐻

# Creating the Navbar

## The Badge

**The Badge**, will tell how many notifications we have, and also how many items do we have in the basket

<br>

```javascript
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
// icons
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
//
//
const Navbar = () => {
  return (
    <>
      <AppBar></AppBar>
    </>
  );
};
export default Navbar;
```

<br>

## The badgeContent

- The **badgeContent={ }** is going to be equal to the number of items that we have, but how can we know in the beginning? right now we cannot! but lets add **2**, later on it will become dynamically.

<br>

#### This is what we have until now

```javascript
const Navbar = () => {
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          {/* 
          
          */}
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              **** // THE BADGE CONTENT
              <Badge badgeContent={2} color="secondary">
                {/* ShoppingCart  is the icon */}
                <ShoppingCart />
              </Badge>
              **** // THE BADGE CONTENT
            </IconButton>
          </div>
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

# 🍌

## The Navbar Styles

#### Now create the styles file for the NavBar

**Copy and paste** the following from the [official repo](https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/Navbar/styles.js#L66)

```javascript
import { makeStyles, fade } from "@material-ui/core/styles";
//
//
const drawerWidth = 0;
//
//
export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
```

<br>

### Import it / add it to the Navbar.jsx

<br>

```javascript
import useStyles from './styles';

const Navbar = () => {
  //
  const classes = useStyles();
```

<br>

### So this is what we have until now

```javascript
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
// icons
import { ShoppingCart } from "@material-ui/icons";

//
import useStyles from "./styles";
import logo from "../../assets/commerce.png";
//
const Navbar = () => {
  //
  const classes = useStyles();
  //
  //
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          {/* 
          
          */}
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={2} color="secondary">
                {/* ShoppingCart  is the icon */}
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
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

### Lets visualize the component

- Go to the App.js
- import the component there

```javascript
import React from "react";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";

//
//
//
const App = () => {
  return (
    <div>
      <Products />
      <Navbar />
    </div>
  );
};

export default App;
```

[<img src="/src/img/navbar_preview_default.jpg"/>]()

<br>
<hr>
<br>
<br>

- min: 31:10

[ECommerce Web Shop - Build & Deploy an Amazing App | React.js, Commerce.js, Stripe](https://youtu.be/377AQ0y6LPA)

## Dont repeat yourself 👈

- Apparently there is a cleaner way of adding as much components as you can

<br>

- the example below is an example of a messy code

```javascript
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
```

### A better approach

```javascript
import { Navbar, Products } from './components';
```
