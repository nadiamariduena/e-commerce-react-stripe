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

-->

<br>

- This is the continuation of **checkoutTokenId-part1**, the checkoutToken is still related to the Checkout button

<br>

# 🍍

## Lets start with Countries

### AddressForm.jsx

#### The first function is going to be the following:

- **1.** this async ( ) is going to accept something known as: **checkoutTokenId**

> Once we start with the order process, we are going to get our own checkoutTokenId, like when you come into the store and you get your own receipt, but instead we get checkoutTokenId(we dont have it yet).

```javascript
  const fetchShippingCountries = async (checkoutTokenId ) => {
```

<br>

- **2.** So what is out fetch country is going to do?
- **3.** we are going to make an API call

```javascript
const response = await commerce.services.localeListShippingCountries(
  checkoutTokenId
);
```

<br>

- **4. so what we get back from?**: commerce.services.localeListShippingCountries(checkoutTokenId);

<br>

**5. we get back a response:** <u>const response </u> (step.3)
**6.** Now destructure the response:

<br>

```javascript
// before
const response,

// after
const {countries}

```

<br>

### like so:

```javascript
const response = await commerce.services.localeListShippingCountries(
  checkoutTokenId
);
```

<br>

### Now the question is: what are we going to do with those countries?

```javascript
setShippingCountries(countries);
```

#### If you remember we still have to create the <u>checkoutTokenId</u> lets see how we are going to do it and from where its going to come from.

<br>
<br>

# 🍊

2:06:23

#### Go to the Checkout.jsx

> The **<u>checkoutTokenId</u>** is going to be created in the Checkout.jsx where we have all the steps for the checkout form

[<img src="/src/img/stepper1.jpg"/>]()

<br>
<br>

#### So inside of here, we can create a new useEffect:

```javascript
// Checkout.jsx
//
// **** Here **** below:
import React, { useState, useEffect } from "react";
//
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
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
//
// Stepper 2.
const steps = ["Shipping address", "Payment details"];

//
//

const Checkout = () => {
  //
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  //
  //
  //
  //
  //----------- Here we will create the TOKEN -----
  //
  //
  //----------- Here we will create the TOKEN -----
  //
  //
  //
  //
  const Confirmation = () => <div>Confirmation</div>;
  //
  //
  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
  //
  //
  //
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {/* stepper 3. */}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/*  */}

          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
```

<br>
<br>

##### 2:07:12

#### INITIALLY we are going to leave it as a 'component did mount', which means its only going to have an empty dependency array []), so its only going to happen to the start <u>but later on, we are going to change it when the _cart changes_</u>

<br>

```javascript
//
//----------- Here we will create the TOKEN -----
//
useEffect(() => {}, []);
//
//----------- Here we will create the TOKEN -----
//
//
```

<br>

# 🐒

### So here the question is, what do we want to do with it?

- The answer is: inside the useEffect, **As soon as someone enters the checkout process**, we are going to generate a **checkout token**

```javascript
//
//----------- Here we will create the TOKEN -----
//
useEffect(() => {
  /*

    **As soon as someone enters the checkout process**, we are going to generate a **checkout token**


*/
}, []);
//
//----------- Here we will create the TOKEN -----
//
//
```

<br>
<br>

#### 🔴

#### So the next step will be to create an Asynchronous function, its going to be an ASYNC ERROR FUNCTION, inside of it we will have a "try and catch" block (to handle errors in case we dont get certain data from the user)

<br>

```javascript
//
//----------- Here we will create the TOKEN -----
//
useEffect(() => {
  const generateToken = async () => {
    try {
      // if the TOKEN is successfully created, we will
      // do something inside here
    } catch (error) {
      // if not, we will send an error
    }
  };
}, []);
//
//----------- Here we will create the TOKEN -----
//
//
```

<br>
<br>

### So how we should actually create a token?

- We first have to import the API here:

<br>

```javascript
// Checkout.jsx
import { commerce } from "../../../lib/commerce";
```

### After you imported it, add the following line:

```javascript
const token = await commerce.checkout.generateToken();
```

<br>

### But what we have to pass in there: generateToken(); ?

- We have to pass 2 things:
  <br>

- First of all we have to pass the **cartId**
- Secondly we have to pass the **type of the token** we are generating.

<br>

# 🍍

## ONLY PROBLEM

- Right now **our cart is inside the App.js**, so we have to pass it from there **to the Checkout.jsx via PROPS**

<br>

- So go to App.js and pass it like so

```javascript
// cart={cart}
//
//
{
  /* CHECKOUT */
}
<Route exact path="/checkout">
  <Checkout cart={cart} />
</Route>;
```

### Then go back to the Checkout.jsx and do the following

```javascript
const Checkout = ({cart}) => {
```

#### Now its ready to be used inside the try{}

- but as we said, we need 2 arguments: first is the cart and the second is the options: {
  type: "cart",
  }

```javascript
//
//----------- Here we will create the TOKEN -----
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      }); /// here 👍
      //
      //

      //
    } catch (error) {}
  };
}, []);
//
//----------- Here we will create the TOKEN -----
//
```

### And that is going to generate out token!!!!

<br>
<br>

### Now lets console.log it but before create a new state field

- NOW BELOW the **console.log**, you can call the state

<br>

- Also call the function **generateToken**

```javascript
//
//----------- new state related to the token ---
const [checkoutToken, setCheckoutToken] = useState(null);
//
//
//----------- Here we will create the TOKEN -----
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      }); /// here 👍
      //
      //
      console.log(token);
      //
    } catch (error) {}
  };
  //
  //
  // calling the function immediately afterwards
  generateToken();
  //
}, []);
//
//----------- Here we will create the TOKEN -----
//
```

<br>

### Why did we have to create a function in the first place? if we are calling the function immediately afterwards

> **The reason**: in the useEffect, you cannot use **async**, unless it s a new function, you cannot simply add the async keyword here:

```javascript
  useEffect(async() => {
```

- **SO FOR THAT REASON:** you have to have a separated function

<br>
<br>

### Now lets go back to the main page of the products in the browser

- Add a couple of items (in more of what you already have)

- Click on the icon cart, then click on <u>check out</u> (**dont worry about the errors** , they are related to the stuff we still need to fill)

[<img src="/src/img/checkOut_TOKEN-visualization1.gif"/>]()

<br>
<br>

## Now that we have the TOKEN, we need to set it to the state(we already did that), so now we have to pass it as a PROPS, grab the following:

```javascript
//----------- new state related to the token ---
const [checkoutToken, setCheckoutToken] = useState(null);
//
//----------- Here we will create the TOKEN -----
//
```

<br>

## And pass it here:

```javascript
// Checkout.jsx
//
//
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );
//
```

<br>

### Then pass it inside the AddressForm.jsx

```javascript
const AddressForm = ({ checkoutToken }) => {
```

### Now we can use it, once we call this "fetchShippingCountries" function, and WHEN are we calling that function?

- Well as soon as the **AddressForm** renders:

```javascript
const AddressForm = ({ checkoutToken }) => {
```

<br>

- We immediately want to get the **fetchShippingCountries**

<br>

#### So we are going to use the **useEffect**

- start by importing it:

```javascript
import React, { useState, useEffect } from "react";
```

- then use it:

```javascript
//
useEffect(() => {}, []);
//
//
```

<br>
<br>

### What we want to do next, is call the fetchShippingCountries inside the useEffect

<br>

```javascript
//
useEffect(() => {
  fetchShippingCountries(checkoutToken.Id);
}, []);
//
//
```

<br>

##### Console.log it to see if it worked

```javascript
const fetchShippingCountries = async (checkoutTokenId) => {
  const countries = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );
  //
  console.log(countries);
  //
  setShippingCountries(countries);
  //
};
```

2:15:59 to continue after the solution of the token issue

<br>
<br>

# 🔴

#### ERROR related to the Token issue(read more inside the errors file)

```javascript
TypeError: Cannot read property 'id' of null
(anonymous function)
src/components/CheckoutForm/AddressForm.jsx:41
  38 | //
  39 |
  40 | useEffect(() => {
> 41 |   fetchShippingCountries(checkoutToken.id);
     | ^  42 | }, []);
  43 | //
  44 | //
```

<br>

## Cannot read property 'id' of null, is UNDEFINED

- That means that the following:

```javascript
// 1
const AddressForm = ({ checkoutToken }) => {
//
//
// 2
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

```

#### So we should ask ourselves, are we not including it correctly?

- How are we passing it inside the Checkout.jsx:

```javascript
const [checkoutToken, setCheckoutToken] = useState(null);
//
//----------- Here we will create the TOKEN -----
//
const [activeStep, setActiveStep] = useState(0);
const classes = useStyles();
//

//----------- Here we will create the TOKEN -----
//
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });

      setCheckoutToken(token);
    } catch {}
  };
  // calling the function, read the readme for this branch
  generateToken();
}, [cart]);
//

const Confirmation = () => <div>Confirmation</div>;
//
//passing the token to the addressForm.jsx
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );
//
//
```

<br>

#### Everything seems okay, so the problem must to be something else.

<br>

### 🔴 But what we have to do inside the Checkout.jsx:

- IS TO MAKE the **update dynamically** with the **cart**:

<br>

```javascript
//----------- Here we will create the TOKEN -----
//
//
useEffect(() => {
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });

      setCheckoutToken(token);
    } catch {}
  };
  //
  generateToken();
}, [cart]); // update dynamically** with the **cart** 👍
//
//
```

<br>

#### So as soon the [cart]); changes, we have to recall for another token

[<img src="/src/img/error_checkOut_TOKEN_countries1.gif"/>]()

<br>
<br>
 
 #### Now lets check in the browser if that was the issue

### 🔴 The error persists

```javascript
TypeError: Cannot read property 'id' of null
(anonymous function)
src/components/CheckoutForm/AddressForm.jsx:41
  38 | //
  39 |
  40 | useEffect(() => {
> 41 |   fetchShippingCountries(checkoutToken.id);
     | ^  42 | }, []);
  43 | //
  44 | //
```

<br>

#### Lets console,log the 'token' one more time, to see if its being generated:

```javascript
// Checkout.jsx
      console.log(token);

        setCheckoutToken(token);
      } catch {}
    };
  //
```

<br>

### Back to the browser console, it seems like we do get the token

- But the it looks like the problem starts before we get the token,

- Because

```javascript
{id: "chkt_3wpN13dZ8y04Z5", cart_id: "cart_roEkjJVa8jb2Vl", created: 1634981205, expires: 1635586005, conditionals: {…}, …}
```

[<img src="/src/img/error_checkOut_TOKEN_countries2.gif"/>]()

<br>

#### if you notice when you scroll up in the list of errors, our token is in the middle, so the problem is starting before it.

- Because it tries to render the **AddressForm**

```javascript
The above error occurred in the <AddressForm> component:

    at AddressForm (http://localhost:3000/static/js/main.chunk.js:1060:3)
    at Form
    at div
    at Paper (http://localhost:3000/static/js/vendors~main.chunk.js:21846:23)
```

<br>

- **while** we still **dont have the token** and it depends on it

[<img src="/src/img/error_checkOut_TOKEN_countries3.gif"/>]()

<br>
<br>

### SO what is happening is the following:

- The following is the **RENDER** method as we know,

```javascript
// Checkout.jsx
//
return (
  <>
    <div className={classes.toolbar} />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {/* stepper 3. */}
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/*  */}

        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  </>
);
```

<br>

## 🌞

### So how react component works?, is that they first render everything:

1. React will render the **JSX** which is the code above inside the return, **at first**.

<br>

2. **Then it will render** the component did mount, in this case the **useEffect**

<br>

3. and Then **re-renders** if it needs to.

<br>
<br>

#### SO in this case:

```javascript
// Checkout.jsx
//
return (
  <>
    <div className={classes.toolbar} />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {/* stepper 3. */}
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/*  */}

        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  </>
);
```

## at this point:

- We still didnt call the checkout token, so we still dont have it,

```javascript

  40 | useEffect(() => {
> 41 |   fetchShippingCountries(checkoutToken.id);
     | ^  42 | }, []);

```

<br>

- but our **AddressForm** is depending on it:

```javascript
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );
```

<br>

## 🌞

### SO in this case we are going to add 1 more check to this form:

- IN here, we are going to say:

> **if** we have the checkout token **and and** form

```javascript
: checkoutToken && <Form />
```

<br>

```javascript
  //
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  //
//
//
//
         {activeStep === steps.length ? <Confirmation /> : checkoutToken &&  <Form />}
        </Paper>
```

<br>

### This means that we need to have the checkoutToken and <u>ONLY</u> if we have it, <u>ONLY then render the form</u>
