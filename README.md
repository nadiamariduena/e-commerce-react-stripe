 <br>

# 🐒 🍌

# Let's Begin!

## 1. Install the dependencies

```javascript
npm install @material-ui/core @material-ui/icons @chec/commerce.js @stripe/react-stripe-js @stripe/stripe-js react-router-dom react-hook-form

//  @chec/commerce.js
// This dependency is going to be the most important one,
// as it s going to manage our ecommerce

```

<br>

##### DOCUMENTATION 1: [The React UI library](https://mui.com/)

##### DOCUMENTATION 2: [Material-UI](https://www.npmjs.com/package/@material-ui/core)

 <br>

### 2. Delete the entire src folder

### 3. Create a new src folder

### 4. Create the index.js

- inside the new created <u>src folder</u>, once you have it, add an **index.js**

```javascript
import React from "react";
import ReactDOM from "react-dom";

//
import App from "./App";
import "./scss/_main.scss";

//
//
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

<br>

### 5. create the App.js

- If you have the snippets installed, type: rafc to generate the functional component
- If you dont have it, go to the extensions and look for: auto Rename tag,
- Bracket Pair colorized, which will add some colors to your code
- But the one we need is: ES7 React/Redux/GraphQL/React-Native snippets

<br>

```javascript
import React from "react";

export const App = () => {
  return <div>E-commerce</div>;
};
```

### 6. Launch the app

- If you get an error, its perhaps due to the scss folder

- Create the scss folder and the:

```scss
_main.scss
```

<br>

### 7. create the Components folder

- Inside the components folder create:the **Products folder**
- Inside of it, create the **Products.jsx** file

<br>

### 8. Product.js

- Import the following:

```javascript
import React from "react";
import Grid from "@material-ui/core";
```

##### I have never used @material-ui/core

> So I dont Know if its going to be better than creating the grids with scss

```javascript
import React from "react";
import Grid from "@material-ui/core";

const Products = () => {
  <main>
    <Grid container justify="center" spacing="4">
      {/* 
                
      Where the products will be shown          
                */}
    </Grid>
  </main>;
};

export default Products;
```

### 9. For now we are not going to use the real products, instead we are going to mimic them.

- Create an array an inside of it add 2 products

<br>

```javascript
import React from "react";
import Grid from "@material-ui/core";

//
// array products
const products = [
  { id: 1, name: "Shoes", description: "Running shoes" },
  { id: 2, name: "Mac book", description: "Apple macbook" },
];

const Products = () => {
  <main>
    <Grid container justify="center" spacing="4">
      {}
    </Grid>
  </main>;
};

export default Products;
```

<br>

#####

> When you open the brackets **{}** inside the jsx, <Grid for example, **you are indicating to jsx that you will write javascript logic inside of it**. like so:

```javascript
    <Grid container justify="center" spacing="4">
      {products.map((productItem) => (
        //   you are grabbing the products from the array
      ))}
    </Grid>
```

<br>
<br>

### 10. LOOPING through the products array

- Dont forget to add the **id key**, otherwise you will get an error.

<br>

```javascript
const products = [
  { id: 1, name: "Shoes", description: "Running shoes" },
  { id: 2, name: "Mac book", description: "Apple macbook" },
];
/*


*/

const Products = () => {
  <main>
    <Grid container justify="center" spacing="4">
      {products.map((product) => (
        //
        <Grid item key={product.id}>
          {/* 
        
        Every time you are looping through something in jsx
        you need to have the id
        
        */}
        </Grid>
      ))}
    </Grid>
  </main>;
};
```

<br>

### 11. Styles for the different devices (grid only)

- min 12:14

<br>

```javascript
<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}></Grid>
```

<br>

- **xs={12}** this means its going to take full width in mobile devices
- **sm={6}** for small devices its going to take 6 spaces out of 12, which means that 2 of them will be in the same row
- **md={4}** for medium we can put 4
- **lg={3}** for large we will have 3 (You can change how it goes)

<br>

### 12. Before continuing in this file, Go to the Produc<u>ts</u> Folder

- While there, create a **folder** and call it **Product**
- Inside the new **Product** folder, create a new file and call it **Product.jsx**

- Inside the new **Product.jsx**, type: **rafce** to create a functional component

```javascript
import React from "react";

const Product = () => {
  return <div>{/* 
            
            Here we will have all the LAYOUT for the products,
            meaning the images, the description and all that goes with it.
           
           
           */}</div>;
};

export default Product;
```

<br>

### 13. Lets create our card

- Import styles from **@material-ui**

```javascript
import React from "react";
// Import few things from material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconBotton,
} from "@material-ui/core";

//
import { AddShoppingCart } from "@material-ui/icons";
//
//

const Product = () => {
  return <div></div>;
};

export default Product;
```

<br>

#### title={product.name} is being passed through PROPS from the Products.js

```javascript
//
import { AddShoppingCart } from "@material-ui/icons";
//
import classes from "*.module.css";
//1.

const Product = () => {
  return (
    <div>
      // below is linked to step 1.
      <Card className={classes.root}>
        // below is linked to step 1.
        <CardMedia className={classes.media} image="" title={product.name} />
        // title={product.name} is being passed through PROPS from the
        Products.js
      </Card>
    </div>
  );
};

export default Product;
```

<br>

### 14. Go back to the Produc<u>ts</u>.jsx to initialize the PROPS and make the connection with Produ<u>ct</u>.jsx

<br>

#### Explanation:

- The **product={product}** , is the argument inside the map function, that is grabbing the data from the **{products.map** ARRAY

- So in the following line we are declaring the other Product.jsx component and passing the data from this Product.jsx there:

<br>

```javascript
//  the component: <Product
<Product product={product} />
//  the data: product={product}
```

<br>

```javascript
import React from "react";
import Grid from "@material-ui/core";

//
// ARRAY
const products = [
  { id: 1, name: "Shoes", description: "Running shoes" },
  { id: 2, name: "Mac book", description: "Apple macbook" },
];
/*


*/

const Products = () => {
  <main>
    <Grid container justify="center" spacing="4">
      {products.map((product) => (
        //
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  </main>;
};

export default Products;
```

<br>

### 15. Go back to the Produ<u>ct</u>.jsx

- Add the following:

```javascript
<CardContent>
  <div className={classes.CardContent}>
    <Typography variant="h5" gutterBottom>
      // here we render the product name from the mapping on the other file
      {product.name}
    </Typography>
  </div>
</CardContent>
// gutterBottom ...means it s going to have some space on the bottom
```

<br>

### 16. Replicate the <Typography but remove some things

```javascript
<CardContent>
  <div className={classes.CardContent}>
    <Typography variant="h5" gutterBottom>
      {product.name}
    </Typography>
    <Typography variant="h5">{product.price}</Typography>
  </div>
</CardContent>
// gutterBottom ...means it s going to have some space on the bottom
```

<br>

### 17. If you notice, in the second <Typography we added a price, but we dont have one in the array, so go there and add it.

<br>

### 18. Add price to the array in the Produc<u>ts</u>.jsx

```javascript
const products = [
  { id: 1, name: "Shoes", description: "Running shoes", price: '$5' },
  { id: 2, name: "Mac book", description: "Apple macbook", price: '$10' },
];


const Products = () => {
```

<br>

### 18. Now go back to Produc<u>t</u>.jsx and add it there (we already did it so no need for that)

<br>

# 🚀

### To conclude the link between the two files and finally make use of the props

- **ADD THE PROPS** to the function

- we have to make it official by adding the element we are exporting from there to this file Produc<u>ts</u>.jsx

- And you do it like so:

```javascript
// This is the clean way
const Product = ({product}) => {
  return (
    <div>

```

##### This is another way, but in this way we are repeating ourselves, which isnt good

```javascript
// With this way you will have to put props everywhere
// like so: props.product.name and so on...
const Product = (props) => {
  return (
    <div>
//
//
     <Typography variant="h5" gutterBottom>
              {props.product.name}
            </Typography>
```

<br>

### 19. Add another typography box, this time for the description

```javascript
<Typography variant="h5" gutterBottom>
              {product.name}
</Typography>
            //
<Typography variant="h5">{product.price}</Typography>
            //
<Typography variant="h2" color="textSecondary">
              {product.description}
 </Typography>
```

##### color="textSecondary" is going to be a bit greyish

<br>

### 20. Add card Actions: <CardActions...

- is going to have a **PROP** of <u>disableSpacing</u>

[disableSpacing](https://mui.com/api/accordion-actions/)

```javascript
disableSpacing | bool |	false | If true, the actions do not have additional margin.
```

<br>

- ALSO ADD THE: **IconButton** and correct it here:

<br>

```javascript
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
```

<br>

```javascript
<div className={classes.CardContent}>
  <Typography variant="h5" gutterBottom>
    {product.name}
  </Typography>
  <Typography variant="h5">{product.price}</Typography>
  <Typography variant="h2" color="textSecondary">
    {product.description}
  </Typography>
  // // CARD ACTIONS
  <CardActions disableSpacing className={classes.cardActions}>
    <IconButton aria-label="Add to Cart">
      <AddShoppingCart />
    </IconButton>
  </CardActions>
</div>
```

<br>

#### This is what we have until now:

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

//
//icon
import { AddShoppingCart } from "@material-ui/icons";

//

const Product = ({ product }) => {
  return (
    <div>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        <CardMedia className={classes.media} image="" title={product.name} />

        <CardContent>
          {/* 
          
          
          */}
          <div className={classes.CardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5">{product.price}</Typography>
            <Typography variant="h2" color="textSecondary">
              {product.description}
            </Typography>
            <CardActions disableSpacing className={classes.cardActions}>
              <IconButton aria-label="Add to Cart">
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </div>

          {/* 
          
          
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
```

<br>
<br>

### 21. Import the classes related to the following:

> className={classes.CardContent} and all the others that look similar

<br>

### 22. Inside of the <u>Product Folder</u> create a file called: styles.js

- This will work like the scss individual files

<br>
<br>

# 🔴

### 23. Once you are inside the styles.js

- import the following:

```javascript
import { makeStyles } from "@material-ui/core/styles";
```

#### The only goal of this file is to say <u>Export default</u>, which means that we will be exporting something, and that something is <u>the call to the function</u>:

<br>

```javascript
export default makeStyles(() => ({
  // Inside of this object we are going to write our styles
  // The styles are going to be written in css in a JS  kind of way
}));
```

- The styles are going to be written in css in a JS kind of way

<br>

#### function make styles take one parameter (()) and that is yet another callback function inside of there with an instant return, so what you do with an instant return? <u>you wrap it in parenthesis (() => ({}))</u> and then you return an object

```javascript
import { makeStyles } from "@material-ui/core/styles";
//
//
export default makeStyles(() => ({
  // the root: makes alusion to this inside the Product.jsx:
  //       <Card className={classes.root}>
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
  },
  //  <CardMedia className={classes.media} image="" title={product.name} />
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  // <CardActions disableSpacing className={classes.cardActions}>
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  //           <div className={classes.CardContent}>
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
```

<br>

### 24. Now import it in Product.jsx

- Since its an <u>styles HOOK</u>, you will have to declare it in a variable

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

//
//styles HOOK  ****
import useStyles from "./styles";
//icon
import { AddShoppingCart } from "@material-ui/icons";
//
//
const Product = ({ product }) => {
  //
  //
  //  styles HOOK ****
  const classes = useStyles();
  //

  //
  //
  return (
    <div>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        {/* styles HOOK **** */}
        <CardMedia className={classes.media} image="" title={product.name} />

```

<br>

### 25. We are done with the Product.jsx (for now)

<br>

### 26. Now import it in inside the Products.jsx

```javascript
import React from "react";
import Grid from '@material-ui/core/Grid';

import Product from './Product/Product';  /// --- here ----
//
//
const products = [
  { id: 1, name: "Shoes", description: "Running shoes", price: '$5' },
  { id: 2, name: "Mac book", description: "Apple macbook", price: '$10' },
];


const Products = () => {
```

<br>

### 27. Now import the Products.jsx inside the <u>App.js</u>

- but before, correct the following:

```javascript
// instead of this
import Grid from "@material-ui/core/Grid";
//  ADD THIS:
import { Grid } from "@material-ui/core";
```

<br>

### 28. Before launching the first preview check for possible mistakes:

- This is what i have after i cleaned and checked the code (there were mistakes)

<br>

#### Products.jsx

```javascript
import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
//
//
const products = [
  { id: 1, name: "Shoes", description: "Running shoes", price: "$5" },
  { id: 2, name: "Mac book", description: "Apple macbook", price: "$10" },
];
/*


*/

const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
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

#### Product.jsx

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
const Product = ({ product }) => {
  //  styles HOOK
  const classes = useStyles();
  //

  //
  //
  return (
    <>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        {/* styles HOOK */}
        <CardMedia className={classes.media} image="" title={product.name} />

        <CardContent>
          <div className={classes.cardContent}>
            {/* name */}
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            {/* price */}
            <Typography gutterBottom variant="h5">
              {product.price}
            </Typography>
          </div>
          {/*
          
          
          Description */}
          <Typography variant="h2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
        {/* 
        
        CardActions  */}
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart">
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

#### App.js

```javascript
import React from "react";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default App;
```

[<img src="/src/img/firstPreview_default.gif"/>]()
