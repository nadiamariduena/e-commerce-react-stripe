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

# 🍍 🐒

## Creating products with Commerce.js

<br>

- This is the continuation of the fecthing-data-from-commercejs

<br>

#### As I was commenting in the previous branch, this are the steps to create a product:

[<img src="/src/img/creating__products_commercejs2.gif"/>]()

<br>

- SKU is a product identifier

- If you don't fill the **SKU**, its going to auto populate it.
- if you don't add **quantity** its going to say that you have unlimited amounts

#### Right now I have 3 products inside the commerce.js, i think its to do the changes in the cards, to display them in the browser, as we still have the fake ones inside the Products.jsx.

<br>

[<img src="/src/img/after_setting_a_product.gif"/>]()

<br>

<br>
<br>

## 🥥

### To display the products we have to pass them as <u>PROPS</u> to our Products component

```javascript
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

#### Later most of the important things like the card, the products etc are going to be inside the App.js, right now they are in other folder, but soon it s going to change

<br>
<br>

# 🐒

#### 1. So lets pass the Props

- INSIDE THE APP.JS

```javascript
// replace this:
<Products   />

// For this
<Products products={products} />
```

#### 2. After that: go to the Products.jsx and change the following

- delete the following

```javascript
const products = [
  {
    id: 1,
    name: "Beauty stuff 001",
    description: "Cremes Random",
    price: "$5",
    image: "../img/photo-1580870069867-74c57ee1bb07.jpeg",
  },
  {
    id: 2,
    name: "Beauty stuff 002",
    description: "Cremes Random",
    price: "$10",
    image: "../img/photo-1608142172654-318a624fe4ec.jpeg",
  },
];
```

#### 3. Add the props here too:

```javascript
const Products = ({ products }) => {
```

<br>

#### 4. Now go to the Product.jsx

- Use the div and the console log to get an outcome so that you can see something and use the inspector, as you really need to use the inspector to continue.

# ⚠️

> You will get an error if you don't add the return:

```javascript
console.log(product);
//
return <div>test</div>;
```

#### Now lets visualize what we have, open the browser

- why did we use a console.log and a div?

- We did that to check which property we are going to use, as they are not the same (the properties at the right side of the inspector, are the ones that are going to guide you)

[<img src="/src/img/props_products2.jpg"/>]()

<br>
<br>

### Now lets go back to the Product.jsx

- CHANGE A COUPLE OF STUFF (**Use the inspector**)

- You can remove the **test div** and the console log at any time,(**But add it again if you get some errors when applying the parameter in the cards, like you will see in the image below**)

<br>

##### 🔴 IN the video tutorial there are many deprecated things, this one for example didnt work for me <u>product.image.source</u>, so i had to use the console log and the div test again to check the properties, once i did that i had this: image={product.image.filename}, but it worked for all but the images, yes i solved the error but still no image, so i removed the console log and the div return, and i checked again the properties, and this time i had this: image={product.image.url}

- Check the vid in your private videos (notes to myself)

- You will see there all about this issue

```javascript
// Change this:
<CardMedia
  className={classes.media}
  image={product.image.source}
  //
  //
  // For this:
  //  image={product.image.filename}
  image={product.image.url}
/>
```

<br>

### This is how the IMG should look like now:

```javascript
const Product = ({ product }) => {
  //  styles HOOK
  const classes = useStyles();

  //
  return (
    <>

      <Card className={classes.root}>

        {/* img */}
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        />
```

[<img src="/src/img/img_propertie_issue_solved.jpg"/>]()

## SUCCESS ✔️ | We can now display the products

<br>

### Now lets solve the Html Issue in the card, its displaying html elements

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

## dangerouslySetInnerHTML

- Dangerously Set innerHTML,

**Improper use of the innerHTML can open you up to a cross-site scripting (XSS) attack.** Sanitizing user input for display is notoriously error-prone, and failure to properly sanitize is one of the leading causes of web vulnerabilities on the internet.

Our design philosophy is that it should be "easy" to make things safe, and developers should explicitly state their intent when performing “unsafe” operations. <u>The prop name dangerouslySetInnerHTML is intentionally chosen to be frightening, and the prop value (an object instead of a string) can be used to indicate sanitized data.</u>

After fully understanding the security ramifications and properly sanitizing the data, create a new object containing only the key \_\_html and your sanitized data as the value. Here is an example using the JSX syntax:

[Read more](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)

<br>

##### [Set innerHTML vs dangerouslySetInnerHTML](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)

> The immediate effect of using innerHTML versus dangerouslySetInnerHTML is identical -- the DOM node will update with the injected HTML.

> However, behind the scenes when you use dangerouslySetInnerHTML it lets React know that the HTML inside of that component is not something it cares about.

> Because React uses a virtual DOM, when it goes to compare the diff against the actual DOM, it can straight up bypass checking the children of that node because it knows the HTML is coming from another source. So there's performance gains.

<br>
<br>

### 🔴 IF YOU GET THIS ERROR (its probably because you have no internet connection)

##### Unhandled Rejection (TypeError): Cannot read property 'status' of undefined

- in your local server you can visualize almost anything but for online databases you do need an internet connection

[<img src="/src/img/html_product_issue_solved.jpg"/>]()

min: 52:17

<br>
<hr>
<br>
<br>

# 🖱️ 🛒

# Make Cart clickable and the basket dynamic

- By making the CART clickable, **we will be able to add the item we click on, on the basket**(like when we really want to buy something)

<br>

### Inside the App.js

<br>

### 🛒

#### Create the CART (this again, is done by commercejs)

<br>

- OUR CART is going to be another **state** in React
- More specifically, it's going to be an **object{}**

<br>

- By default that cart is going to be **empty**, because in the beginning there s no products in our basket/cart

```javascript
const App = () => {
  // 39:39
  const [products, setProducts] = useState([]);
  // by default our products are going to be equal to an empty Array ([])
  //
  //
  //HERE BELOW  53:10
  const [cart, setCart] = useState({});
  // By default that cart is going to be **empty**, because in the beginning there s no products in our basket/cart
```

 <br>

# Fetch

#### Now we are going to create another function "to see what is in the cart"

<br>

- This new **fetch** function is going to be again an **ASYNC AWAIT** function

- Inside of that function we can do the same thing we did with the first one also in the App.js

<br>

```javascript
const App = () => {
  const [products, setProducts] = useState([]);
  //
  const [cart, setCart] = useState({});
  //
  // The fetch related to the products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  //
  // The fetch related to the CART
  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    // so what we want do here? we want to fetch something
    // - we want to fetch a response* from await* to get the thing we want in this case: the cart: commerce.cart.retrieve();
  };
```

<br>

### Use the retrieve() call

- to retrieve individual records from an object. The client application passes the list of fields to retrieve, the object, and an array of record IDs to retrieve.

<br>

#### so our actual response, is the cart

```javascript
// The fetch related to the CART
const fetchCart = async () => {
  const cart = await commerce.cart.retrieve();
  // so what we want do here? we want to fetch something
  // - we want to fetch a response* in this case the cart from await*
  setCart(cart);
};
```

#### Lets change the data above to this format, as we are repeating outselves with the variables

```javascript
//  Change this:
const fetchCart = async () => {
  const cart = await commerce.cart.retrieve();
  setCart(cart);
};

// For this:
const fetchCart = async () => {
  // because you can use the value of the API to do the short way
  setCart(await commerce.cart.retrieve());
};
```

<br>

### Once the fetch function is done, lets oficially FETCH the cart by adding it to the useEffect()

```javascript
useEffect(() => {
  fetchProducts();
  //
  fetchCart();
}, []);
```

<br>

### Now lets console.log(cart) to see what is in there

<br>

- So what we have here: first we get an empty array then we have 2 products

 <br>

[<img src="/src/img/adding_the_cart1.jpg"/>]()

<br>

### But the thing we are looking for: Is 'line items' and the 'sub total'

[<img src="/src/img/adding_the_cart2_line_items_subtotal.jpg"/>]()
