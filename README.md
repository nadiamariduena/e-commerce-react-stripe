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

# 🥥 <u>CHECKOUT </u> set up

> The CheckoutForm layout will serve as some walk through as we go through the purchasing process

<br>

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

#### Even if we don't have the < Checkout /> component add it anyway, then export it inside the index.js

```javascript
// App.js
import { Products, Navbar, Cart, Checkout } from "./components";
//
// index.js *****
export { default as Checkout } from "./CheckoutForm/Checkout/Checkout";
```

<br>

## Create the <u>Checkout</u> component

- Go to the **components folder** and create a new folder

- call it **CheckoutForm**, inside of this folder **create another folder**

- call it **Checkout**, inside of this folder create a new file, call it **Checkout.jsx** (dont forget to export it inside the index.js)

<br>

# 🥥

### Now export it (so to be used inside the route)

```javascript
export { default as Checkout } from "./CheckoutForm/Checkout/Checkout";
```

<br>
<br>

## <u>Checkout.jsx</u>

- This is the basic set up, I also added the **styles.js**, which can create a lot of undesired errors when we just set this file up.

<br>

- The **styles.js** goes inside the **Checkout folder**

<br>

```javascript
import React from "react";
//
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
//
//
import useStyles from "./styles";

//
//
const Checkout = () => {
  //
  const classes = useStyles();
  //
  return (
    <>
      <div></div>
    </>
  );
};

export default Checkout;
```

<br>
<br>

# STEPPER COMPONENT

> **Steppers convey progress through numbered steps.**

<br>

**Steppers display progress through a sequence of logical and numbered steps.** They may also be used for navigation. Steppers may display a transient feedback message after a step is saved.

<br>

[<img src="/src/img/stepper1.jpg"/>]()

<br>

### Other type of steppers

- **Definition: An input stepper is a two-segment UI control used to incrementally increase or decrease a numeric value.** Most input steppers are visual elements of a graphical user interface (i.e., they're GUI controls), voice and gestural interfaces can also have steppers.

[<img src="/src/img/stepper2.png"/>]()

<br>

### Adding a stepper

> The stepper is a component
> that moves as you move through the steps.

**stepper needs to have a couple of things:**

- it needs an activeStep, we don't have it yet, so will set it
  to 0 , **activeStep={0}**. Later on we will update this using state.

```javascript
<Stepper activeStep={0} className={classes.stepper}>
```

<br>

- Inside the stepper we have to **.map** through all our steps,
  and the steps to map on will be:

- **shipping address** and **payment details**

```javascript
const steps = ["Shipping address", "Payment details"];
```

<br>
<br>

## What we have until now:

<br>

```javascript
import useStyles from "./styles";
//
//
// Stepper 2.
const steps = ["Shipping address", "Payment details"];

//
//

const Checkout = () => {
  //
  const classes = useStyles();
  //
  return (
    <>
      <div className={classes.toolbar} /> //this div is a padding for the navbar
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          {/*  1. */}
          <Stepper activeStep={0} className={classes.stepper}>
            {/*  3. */}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
```

### So this is going to generate a nice looking stepper

```javascript
<Stepper activeStep={0} className={classes.stepper}>
  {steps.map((step) => (
    <Step key={step}>
      <StepLabel>{step}</StepLabel>
    </Step>
  ))}
</Stepper>
```

<br>

1:43:00

### Now lets import the { useState}, so that we can actually traverse through the steps

```javascript
// 1
import React, { useState } from "react";
//
//
//
const Checkout = () => {
  //2
  const [activeStep, setActiveStep] = useState(0);
  //
//
// 3
//  Now the the active step is ready to be used, so change the following:
// instead of this:
 <Stepper activeStep={0} className={classes.stepper}>
 </Stepper>
//  add this
 <Stepper activeStep={activeStep} className={classes.stepper}>
//  WE CHANGED THE 0for the actual step
  </Stepper>
```

### Its working!

[<img src="/src/img/checkout1_working.gif"/>]()
