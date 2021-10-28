<!-- # 🍯
API
app prgramming interface
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

- 1. default-project
- 2. navbar-basic-and-default-commercejs-setup
- 3. fecthing-data-from-commercejs
- 4. creating-products-with-commercejs-adding-dynamic-button-add-to-basket
- 5. Cart.CartItem-buttons-increase-decrease-remove
- 6. buttons-increase-decrease-remove-emptyCart-allready
- 7. checkoutTokenId-part1
- 8. token-shipping-Countries
- 9. token-shipping-Subdivisions
- 10. token-shipping-Options
- 11. the-next-button-before-payment-form
- 12. stripe-1
- 13. stripe-2-order-confirmation-done

https://commercejs.com/blog/adding-assets-via-the-chec-api/

-----------------------------------------
All deprecated elements:

https://commercejs.com/docs/api/#versioning

*-----------------------------------------


  // For each country, what we wanna do? we want to return,
  // a block of JSX, in this case it will be:<MenuItem and its content



Oladimeji Odunsi_beauty-woman1.jpeg
Aiony Haust_beauty-woman2.jpeg
pexels-linda-prebreza-286951.jpg
pexels-valeriia-miller-3910071.jpg
pexpexels-Venus-HD-Make-up-and-Perfume-2587363.jpg

-->

<br>

- This is the continuation of **stripe-2-order-confirmation-done**, is still related to the Checkout

<br>

# 🌵

[<img src="/src/img/stripe2ready.gif"/>]()

<br>
<br>
<br>

<br>

# CHECKOUT / STRIPE 2: Confirmation styling and spinner

3:11:23

<br>
<br>

### In this section we will be handling the styling of the "Confirmation" Card

<br>

<br>
<br>
 
 #### Checkout.jsx:  So what we have so far:

```javascript
//
const Confirmation = () => <div>Confirmation</div>;
//
//
```

<br>

### Now add the following, this will only be shown if the order is FULFILLED!!

- Add the CircularProgress, CssBaseline, Divider, Button to the import

```javascript
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  CssBaseline,
  Divider,
  Button,
} from "@material-ui/core";

//
import { Link } from "react-router-dom";
//
//
//
const Confirmation = () => (
  <>
    <div>
      <Typography variant="h5">
        Thank you for your order, firstName lastName
      </Typography>
      // ______________________________________ //
      <Divider className={classes.divider} />
      // ______________________________________ //
      <Typography variant="subtitle2">
        Order ref: the reference that will go here needs to be dynamic
      </Typography>
    </div>
    <br />
    // ______________________________________ //
    <Button component={Link} variant="outlined" type="button" to="/">
      Back to home
    </Button>
  </>
);
```

<br>

# 🚧

### So to only show the confirmation we will have to add an if statement, using the <u>ternary operators **? and :**</u>

##### [Make Your Code Cleaner with JavaScript Ternary Operator](https://www.javascripttutorial.net/javascript-ternary-operator/)

<br>

- So we will say if the order exists we will show whatever is after the **?** and inside the **()** parenthesis

<br>

- But if there is no **order/purchase** because for some reason **its taking too much time to load etc**, we will show whatever is after the **:** and again inside the **()** parenthesis

<br>

## So If there is no order 'yet', we will add an spinner, because of course we dont want our client to stare at a blank screen :) 🧱

> So we are going to give him **something to look at**.

- We will have to IMPORT the **spinner from material Ui** (the spinner is a loader indicator)

<br>

#### [What is a spinner](https://www.w3schools.com/bootstrap4/bootstrap_spinners.asp)

> **What is a spinner in react?**
> Spinner Component provides a way to show the **loading effect**. We can use it to show the loading state, whenever required in our application. We can use the following approach in ReactJS to use the react-bootstrap Spinner Component. Spinner Props: animation: It is used to define the type of animation for the spinner.

<br>

```javascript
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
```

<br>

#### But you have to be conscious that not all can proceed in a correct way, sometimes there are going to be errors and we have to be prepared for it.

<br>

### So lets handle the possible errors

- Lets change the following

```javascript
// from this
const Confirmation = () =>
//
//
// to this
let Confirmation = () =>

```

<br>

### Remember, we already have the error function inside the App.js, so we only need to use them here as they are already passed as props on the top of the Checkout.jsx

```javascript
const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
```

<br>

#### Add the error handling under the spinner (not inside the if statement)

```javascript
// Related to the errors, in case something
// goes wrong with the order confirmation
//
//
if (error) {
  Confirmation = () => (
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  );
}
```

### Now lets replace this:

```javascript
// REPLACE THIS:
<Typography variant="h5">
Thank you for your order, firstName lastName
</Typography>
//
<Typography variant="subtitle2">
Order ref: the reference that will go here needs to be dynamic
</Typography>
//
//
//
// FOR THIS:
  <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
  //
  //
   <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
```

<br>
<br>

### The spinner is not visible because my connection is too fast, but we can console.log it to see if it is there.

[<img src="/src/img/confirmation-card__and_spinner___success.gif"/>]()
