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
      {/* 
                
      Where the products will be shown          
                */}
    </Grid>
  </main>;
};

export default Products;
```
