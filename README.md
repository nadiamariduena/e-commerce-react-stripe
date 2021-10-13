## 1. Install the dependencies

```javascript
npm install @material-ui/core @material-ui/icons @chec/commerce.js @stripe/react-stripe-js @stripe/stripe-js react-router-dom react-hook-form

//  @chec/commerce.js
// This dependency is going to be the most important one,
// as it s going to manage our ecommerce
```

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
      {products.map((productItem) => (
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

- INside the new **Product.jsx**, type: **rafce** to create a functional component

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
