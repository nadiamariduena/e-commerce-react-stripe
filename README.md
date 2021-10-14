<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
<br>

# CREDITS:

Big thanks to **[Adrian Hajdin](https://github.com/adrianhajdin)** , for sharing this **Great tutorial** on how to set up an E-commerce store using: React | Commerce.js and Stripe. -->

### In this Branche we will be setting up the <u>basic Navbar</u> and the basic <u>Commercejs API</u> related

<br>

- **Note**: This is the first part of the tutorial (after the default setup)

<br>

# 🐻 🍯

## Few things to correct before we start with the Navigation Bar:

#### 1. Add the return()

- One of the errors i got, was because the Products.jsx didn't have a return() wrapping the whole content of that file.(**like it should normally have**)

```javascript
  return (
    <main>
      <Grid container justify="center" spacing={4}>
```

<br>

#### 2. Add the images to the Products.jsx

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

### Add the logo image

- Create a folder and called it assets

- Inside of it add the image

- Then import it:

```javascript
import logo from "../../assets/commerce.png";
//
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

# 🍌

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

# 🍌 🍌 🍌 

- min: 31:10

[ECommerce Web Shop - Build & Deploy an Amazing App | React.js, Commerce.js, Stripe](https://youtu.be/377AQ0y6LPA)

#### Dont repeat yourself 👈

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

<br>

# 🐒

### A better approach

```javascript
import { Navbar, Products } from "./components";
```

### But for this to work, we have to do a last thing:

- inside the **components folder**, we need to create a **index.js** file

<br>

- From that **index.js** we are going to export all the other components, like so:

```javascript
// index.js inside the components folder
export { default as Navbar } from "./Navbar/Navbar";
export { default as Products } from "./Products/Products";
```

<br>
<br>

# ⚠️

# <u>Issues</u>

1. **fade is deprecated** so copy and paste the link of the error

Grab the alpha link, then replace all the fades in the styles code fro alpha

 <br>

2.  **replace Justify** and copy the **justifyContent**, then put it inside the Products.jsx

[<img src="/src/img/deprecated1.gif"/>]()

<br>

### 🔴 Hidden Navbar

3.  The Navbar is hiding the products

 <br>

### Create a new styles.js, this time inside <u> the Products folder</u>

- Add the following:

```javascript
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));
```

<br>

## classes.toolbar

- This is linked to the step above

### Go to Products.jsx and import the styles

- also add the following

```javascript
import Product from "./Product/Product";
// NEW **
import useStyles from "./styles";
//
//

/*


              ARRAY DATA GOES HERE

 */

const Products = () => {
  //
  // NEW **
  const classes = useStyles();
  //
  return (
     // NEW ** this 2 lines
    <main className={classes.content}>
    // this line below will add the space between the NAVBAR and the products
      <div className={classes.toolbar} />
```

<br>

#### As you can see, its working!

[<img src="/src/img/navbar_related2.jpg"/>]()

<br>
<hr>
<br>
 
 # 🐒 🍍

<br>

### Create a new folder inside the src, call it <u>lib</u> as library.

- In lib you will Create a new file called: Commerce.js

- Inside the commerce.js file, you are going to import:

```javascript
import Commerce from "@chec/commerce.js";
//
// here below we are creating a new instance of that specific commerce,
// and that is going to be our store
export const commerce = new Commerce("");
// (); as first parameter we are going to introduce our PUBLIC KEY
```

### (); as first parameter we are going to introduce our PUBLIC KEY, but right now we are going to store all data sensitive inside the .env file (read below)

<br>

# 🔑

### What is [Commercejs](https://commercejs.com/)

> Its an API-first eCommerce platform for developer and business

<br>

- **Commerce. js is a headless eCommerce platform, built specifically for developers and designers to build custom eCommerce solutions**. We're making it easier and faster for developers to integrate eCommerce into any web, mobile, or smart device project. ... As an API-first platform, Commerce.

<br>

## <ul>THE PUBLIC KEY</u>

- Go to commercejs.com

- **Open** an account

- **Once you have your account**, click on the green button on the bottom, then go to the left side of the screen where all the icons are, an look for the **developers icon** (which is the the 4 icon), then look for settings(inside the developers tab).

- Inside there you will find your public key, **copy** and paste it in the **.env** file that we will create now, **this file will store all our KEYS**.

<br>

# ⚠️ ⚠️ ⚠️

### CREATE THE .ENV File outside the SRC

- The **.env** stands for environmental variables.
- This are variables that only you can see in your PC

<br>

🔴

- <u>**This file will contain sensitive data so be sure to make it secret**</u> by adding it to the git ignore.

<br>

#### Type the following inside the .env file

```javascript
REACT_APP_CHEC_PUBLIC_KEY=
```

#### Then PASTE the key 'after the = '

```javascript
// This is the key of the youtuber, mine will look different
pk_19840575a9facac44327ea0ec81e58986780ff33e1e3e;
```

### The way we access to the <u>.env</u> is Through the <u>commerce.js</u> file, like so:

- There you will add the KEY NAME we created there

- The last value which is **true** at the end of the link key, means that its going to create a new store

```javascript
import Commerce from "@chec/commerce.js";
//
// here below we are creating a new instance of that specific commerce,
// and that is going to be our store
export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY_TEST,
  true
);
```

#### Now we have this object below, that we can use all around the application

- Normally to create a fully functional web shop application, you will need a full backend API

- With all the Routes for fetching the products, creating the products deleting them, updating them, selling them.

- You need AUTHENTICATION and a lot of stuff

### But in our project all of the above, is stored in the following like of code:

```javascript
import { commerce } from "./lib/commerce";
```

# 🔺 ERROR

### If you get an error, check if the data related to the commerce.js is well added, then turn off the server in VS then npm start again, it solved it for me.
