<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
<br>

# CREDITS:

Big thanks to **[Adrian Hajdin](https://github.com/adrianhajdin)** , for sharing this **Great tutorial** on how to set up an E-commerce store using: React | Commerce.js and Stripe. -->

<br>

# 🐻 🍯

## Commercejs continuation

- This is the continuation of the navbar basic and default commercejs setup(You can find it in the branches)

<br>
<hr>
<br>

### Lets continue adding stuff to the App.js

- check all the new\*\*

```javascript
// NEW**
import React, { useState } from "react";
import { Navbar, Products } from "./components";
//
// KEY
import { commerce } from "./lib/commerce";

//
const App = () => {
  // NEW**
  const [products, setProducts] = useState([]);
  // by default our products are going to be equal to an empty Array ([])
  //
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
```

<br>

### How are we going to populate this const [products ?

- We can perhaps **fetch them**: useState ?

- but first lets import the **useEffect**

```javascript
// NEW**
import React, { useState, useEffect } from "react";
```

- We are going to use the useEffect to fetch data when the app loads

<br>

# FETCH 📦

#### Loading the products: Create the Fetch function

- And that is going to be an ASYNCHRONOUS function

> **these functions have some stages before the action happens**, similar to .then , .catch, **(if data is good deliver it, if not launch a .catch err )** but the code is cleaner.

```javascript
const fetchProducts = async () => {
  // so what we want do here? we want to fetch something
};
```

<br>

### By default our products are going to be equal to an empty Array ([])

<br>

- So **what do we want do here?** we want to **fetch something**
- we want to **fetch a <u>response</u> from <u>await</u>**

<br>

- So **we have to await** something
- And **that something is going to be a specific API call** to this commerce instance

<br>

- its going to be as simple as **commerce.products.list**, and then you **call it ()** as a function.

<br>

- **This is going to return a promise**: commerce.products.list(), so we **have to await to see** what is inside that promise

<br>

```javascript
import React, { useState, useEffect } from "react";
import { Navbar, Products } from "./components";
//
// KEY
import { commerce } from "./lib/commerce";

//
const App = () => {
  // by default our products are going to be equal to an empty Array ([])
  const [products, setProducts] = useState([]);
  //
  const fetchProducts = async () => {
    // so what we want do here? we want to fetch something
    // - we want to fetch a response* from await*
    // - So we have to await something
    // - And that something is going to be a specific API call to this commerce instance
    // - its going to be as simple as commerce.products.list, andthen you call it () as a function
    // - this is going to return a promise:  commerce.products.list(), so we have to await to see what is inside that promise
    const response = await commerce.products.list();
  };

  //

  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
```

<br>

### Once we get that response we can restructure the data from that response

```javascript
//  change this
const response = await commerce.products.list();
//for this:  Once the data is destructured:
const { data } = await commerce.products.list();
// {data} is going to be our products
```

<br>

### what we are going to do is <u>setProducts </u> and then we are going to set the <u>data</u> inside the products

```javascript
// {data} is going to be our products
const { data } = await commerce.products.list();
//
//
setProducts(data);
```

<br>

### So if you notice we have never used the const [products and never called the fetchProducts function

<br>

```javascript
import React, { useState, useEffect } from "react";
import { Navbar, Products } from "./components";
// KEY
import { commerce } from "./lib/commerce";

//
const App = () => {
  const [products, setProducts] = useState([]);
  //
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  //

  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
```

<br>

### Lets call it

- To do that I am going to create a useEffect call, more specifically a use effect hook

```javascript
useEffect(() => {});
```

# }, [ ] ) 🦖

- This useEffect hook is going to have its dependency array **}, [])** set to **empty** , which mean it s only going to run at the start on the render

```javascript
useEffect(() => {}, []);
```

<br>

### In Class based components, this was called a <u>component did mount</u>

```javascript
useEffect(() => {
  // Inside of here, we can use that function call,
  // And simply say fetch products and called
  fetchProducts();
  //
}, []);
```

<br>

### This is going to call our:

- **commerce.products.list();**
- and set the products to state: **setProducts(data);**

<br>

### Now we are going to console.log the products

```javascript
console.log(products);
```

<br>

### But before let's see what we have

```javascript
import React, { useState, useEffect } from "react";
import { Navbar, Products } from "./components";
// KEY
import { commerce } from "./lib/commerce";

//
const App = () => {
  const [products, setProducts] = useState([]);
  //
  // so what we want do here? we want to fetch something
  // - we want to fetch a response* from await*
  // - So we have to await something
  // - And that something is going to be a specific API call to this commerce instance
  // - its going to be as simple as commerce.products.list, and then you 'call it ()' as a function
  // - this is going to return a promise:  commerce.products.list(), so we have to await to see what is inside that promise
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    // {data} is going to be our products
    setProducts(data);
  };

  //
  // Calling the  fetchProducts();
  useEffect(() => {
    fetchProducts();
    //
  }, []);
  //
  console.log(products);
  //
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default App;
```

### Go to the browser to see if its working

- check the inspector

<br>

[<img src="/src/img/undefined-preview-commercejs-products-call1.gif"/>]()

<br>

### Seems like its working but not so well, as we got an empty array and <u>undefined</u>

<br>

- The reason for that, is because obviously we have nothing in our database **commercejs**, so we will need to add some products

<br>

[<img src="/src/img/undefined_first_commerceTests_beforeAdding-Products.jpg"/>]()

<br>

### To create a Product is simple

- You only need to feel the field

- **SKU** is a product identifier

<br>

- You can add a name
- If you dont fill the SKU, its going to auto populate it
- if you dont add **quantity** its going to say that you have **unlimited amounts**
