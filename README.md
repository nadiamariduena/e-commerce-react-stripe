<!-- # 🍯

<br>

#### Small notice:

> After 7 months of teaching myself blender, I am back to code, So this is one of the several projects I am preparing to get back in shape :).

<br>
[<img src="/src/img/undefined_first_commerceTests_beforeAdding-Products.jpg"/>]()
<br>

#### [NOTES : interesting](./src/Interesting.md)

<br>

# CREDITS:

Big thanks to **[Adrian Hajdin](https://github.com/adrianhajdin)** , for sharing this **Great tutorial** on how to set up an E-commerce store using: React | Commerce.js and Stripe.


>**NOTE** THE TEACHER tells that if we are using PROPS too much, the solution for it, is React Context

- But he is not going to use it in this project because we dont have many functions.

- I will create a recap react context soon (based in my school lessons)


-->

<br>

- This is the continuation of **buttons-increase-decrease-remove-emptyCart-allready**

<br>

1:37:40

### Now that everything is ready, we can focus on the functionality of payments

- In this phase we will concentrate in payments(**stripe**)
- creating the layout for the form

<br>

[<img src="/src/img/result_buttons_success.gif"/>]()

<br>

<br>
<br>

# <u>CHECKOUT </u>

<br>
<br>

# 🦆

### To start with the _Checkout_ button, we have to go back to the Cart.js

<br>

- Once there add a **link** component to the **check out button** (we haven't created the route yet)

```javascript
<Button
  component={Link}
  to="/checkout" //*** Here ***
  className={classes.checkoutButton}
  size="large"
  type="button"
  variant="contained"
  color="primary"
>
  Checkout
</Button>
```

<br>

### To Create the 'checkout' route, go to the App.js

- Add the following:

```javascript
<Route exact path="/checkout">
  <Checkout /> //We still dont have it, and that is going to be the next step
</Route>
```
<br>

#### Even if we don't have the <Checkout/> add it anyway, then export it inside the index.js

```javascript
// App.js
import { Products, Navbar, Cart, Checkout } from "./components";
//
// index.js
// export { default as Checkout } from "./CheckoutForm/Checkout/Checkout";
```

<br>

### Create the <u>Checkout</u> component

- Go to the **components folder** and create a new folder

- call it **CheckoutForm**, inside of this folder **create another folder**

- call it **Checkout**, inside of this folder create a new file, call it **Checkout.jsx**

<br>

# 🥥

## Now export it (so to be used inside the route)
