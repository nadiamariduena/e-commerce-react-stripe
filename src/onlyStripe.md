<br>
<br>
<br>

# STRIPE 🍨

**< Elements >** come from **Stripe**, these are pre done elements that stripe
does for us.

### [Elements provider](https://stripe.com/docs/stripe-js/react)

> The Elements provider allows you to use Element components and access the Stripe object in any nested component. **Render an Elements provider at the root of your React app so that it is available everywhere you need it**.

> **To use the Elements provider, call loadStripe from @stripe/stripe-js with your publishable key.** The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements.

<br>

- Inside the < Element we are going to pass the STRIPE property: **stripe={stripePromise}** (we havent created it yet)

```javascript
const PaymentForm = ({ checkoutToken }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      {/*     Divider between products and payment details           */}
      <Divider />
      {/*     Divider between products and payment details           */}
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment methods
      </Typography>
      {/*  */}
      <Elements>{/*         STRIPE  */}</Elements>
    </>
  );
};

export default PaymentForm;
```

<br>

- Inside the < Element we are going to pass the STRIPE property: **stripe={stripePromise}** (we havent created it yet)

```javascript
<Elements stripe={stripePromise}> </Elements>
```

<br>

### [STRIPE OBJECT](https://stripe.com/docs/stripe-js/react)

> A Stripe object or a Promise resolving to a Stripe object. The easiest way to initialize a Stripe object is with the Stripe.js wrapper module. **After this prop has been set, it can not be changed.**

<br>

<br>

- SO lets create the **stripePromise**, just above the **const PaymentFrom**

<br>

- the **loadStripe('...');** is going to contain the public key from the **stripe store**

- We will need to **create an stripe account** in order to get the key, but lets concentrate in the things we still have to do inside the **PaymentForm.jsx**

<br>

```javascript
//STRIPE 1
import { loadStripe } from "@stripe/stripe-js";
//
//
//STRIPE 2
const stripePromise = loadStripe('...');
//
//
const PaymentForm = ({ checkoutToken }) => {
  return (
          {/* STRIPE 3 */}
      <Elements stripe={stripePromise}> </Elements>
    </>
```

### NEXT: Inside the PaymentForm.jsx add the following:

. Add the **< ElementsConsumer**, this

##### ⚠️ Look at the code below and be sure its correctly added, as if anything is mistyped it can go wrong

```javascript
      <ElementsConsumer>
{()=>(
// Here we are going to accept some params from STRIPE and inside of
// we will create the form for the payment
)}

      </ElementsConsumer>
```

<br>
<br>

### The PAYMENT form

- the **CardElement** comes from stripe: **@stripe/react-stripe-js";**

```javascript
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
//
//
<ElementsConsumer>
  {({ elements, stripe }) => (
    <form>
      <CardElement />
    </form>
  )}
</ElementsConsumer>;
```

<br>

### Inside the CardElement you will add some br: break, you can also add a margin inside the style of the div, i will do both:

```javascript
<ElementsConsumer>
  {({ elements, stripe }) => (
    <form>
      <CardElement />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      ></div>
    </form>
  )}
</ElementsConsumer>
```

<br>

### Now we are going to add the button that will give us the option to go 1 step back and also the PAY button

<br>

# 🐒

### lets prepare the button for it:

- **CREATE also** a button for **SUBMIT/PAY**, this button is going to be disabled if we dont have access to stripe: **disabled={!stripe}**

<br>

> **disabled={!stripe}** This will make sure that people don't click **SUBMIT/PAY**, without having filled the required payment fields.

<br>

```javascript
<CardElement/>
  <br />
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    }}
  >
    <Button variant="outlined">Back</Button>
    // PAY BUTTON
    <Button
      type="submit"
      variant="contained"
      disabled={!stripe}
      color="primary"
    >
      PAY {checkoutToken.live.subtotal.formatted_with_symbol}
    </Button>
  </div>

```

<br>
<br>

### SO What are our BUTTONS going to do?

- The one below need to have a **on click function**

```javascript
<Button variant="outlined">Back</Button>
```

- If you remember, we set up a function inside the **Checkout.jsx** that will handle the **going back**

```javascript
// Checkout.jsx
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
```

<br>

#### So go to the Checkout.jsx and pass it as PROPS

```javascript
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      backStep={backStep}
    />
  );
```

<br>

### Now add it inside the const PaymentForm = ({ checkoutToken, backStep }) => { and pass it inside the onClick={}

```javascript
<Button variant="outlined" onClick={backStep}>
  Back
</Button>
```

<br>

# All set up is ready to require the stripe key for payment

[<img src="/src/img/button-PAY-create-account-stripe-for-this-to-work.gif"/>]()

<br>
<br>

### So what we have until now:

```javascript
import React from "react";
//
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
//
//STRIPE 1
import { loadStripe } from "@stripe/stripe-js";
//
//
import Review from "./Review";

//
//STRIPE 2
const stripePromise = loadStripe("...");
//
//
const PaymentForm = ({ checkoutToken, backStep }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      {/*     Divider between products and payment details           */}
      <Divider />
      {/*     Divider between products and payment details           */}
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment methods
      </Typography>
      {/* STRIPE 3 */}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form>
              <CardElement />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                {/*  */}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  PAY {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
```

### Checkout.jsx

```javascript
//
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      backStep={backStep}
    />
  );
//
//
```

<br>
<br>
<hr>
<br>
