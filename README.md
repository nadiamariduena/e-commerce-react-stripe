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


https://commercejs.com/blog/adding-assets-via-the-chec-api/

-----------------------------------------
All deprecated elements:

https://commercejs.com/docs/api/#versioning

*-----------------------------------------


  // For each country, what we wanna do? we want to return,
  // a block of JSX, in this case it will be:<MenuItem and its content
-->

<br>

- This is the continuation of **the-next-button-before-payment-form**, is still related to the Checkout button

<br>

# 🍉 🥭

[<img src="/src/img/button-next-before-payment.gif"/>]()

<br>
<br>
<br>

<br>

# CHECKOUT: / PAYMENT FORM /STRIPE

2:42:27

<br>
<br>

### Start by importing a couple of things

1. Import **react stripe**
2. Import **stripe**
3. import the **styles**

<br>

```javascript
import React from "react";
//
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
//
import { loadStripe } from "@stripe/stripe-js";
//
import { Typography, Button, Divider } from "@material-ui/core";

const PaymentForm = () => {
  return (
    <>
      <div>Payment Form testo </div>
    </>
  );
};

export default PaymentForm;
```

<br>

## Create the last component of this project!!

- CREATE IT inside the **CheckoutForm** folder

<br>

> You will call the component **review**, this is going to be a general list of all the things we have **'PURCHASED'** (usually what you see before paying for the items/item).

- **Review.jsx**

<br>

### Now import the Review.jsx inside the PaymentForm.jsx

```javascript
//
import Review from "./Review";

const PaymentForm = () => {
  return (
    <>
      <Review />
    </>
  );
};

export default PaymentForm;
```

<br>

### While in the Review.jsx, import the following:

- Inside the **List** you are going to loop through all the products we have in our cart.

<br>

```javascript
import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List>{/* 
          HERE you are going to loop
            through all the products we have in our cart */}</List>
    </>
  );
};

export default Review;
```

### To Loop throught the products we need to have access to them, the best way for that is to 'REQUIRE' the <u>TOKEN</u> that is inside Checkout.jsx

<br>

> So grab the **Token** that is stored inside the states

```javascript
// Checkout.jsx
//
//----------- new state related to the token ---
const [checkoutToken, setCheckoutToken] = useState(null);
//
//----------- Here we will create the TOKEN -----
```

<br>

### To grab the token from Checkout.jsx, you need to pass it through _PROPS_ there, like so:

- inside the < PaymentForm, add this: **checkoutToken={checkoutToken}**

```javascript
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />
  );
//
```

<br>

### After that, go back to the PaymentForm.jsx and pass the token there...

```javascript
// 1
const PaymentForm = ({ checkoutToken }) => {
  return (
    <>
      // 2
      <Review checkoutToken={checkoutToken} />
    </>
  );
};

export default PaymentForm;
```

<br>

### Then pass the token inside the < Review component

```javascript
const Review = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List>{/* 
         LOOP */}</List>
    </>
  );
};

export default Review;
```

<br>

## What the <u>TOKEN</u> will allow us to do <u >inside the List</u>, is to LOOP through all the items

```javascript
{
  checkoutToken.live.line_items.map((product) => (
    //
    //
    <ListItem style={{ padding: "10px 0" }} key={product.name}>
      // // //
      <ListItemText
        primary={product.name}
        secondary={`Quantity: ${product.quantity}`}
      />
      <Typography variant="body2">
        {product.line_total.formatted_with_symbol}
      </Typography>
      // // //
    </ListItem>
    //
    //
  ));
}
```

<br>

### Below this map, we are going to have another ListItem block, it will be related to the total of the products inside the basket/cart

```javascript
{
  /* 

                            THE TOTAL
    
        */
}
<ListItem style={{ padding: "10px 0" }}>
  <ListItemText primary="Total" />
  <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
    {checkoutToken.live.subtotal.formatted_with_symbol}
  </Typography>
</ListItem>;
```

<br>

### The result

[<img src="/src/img/checkout_TOTAL--amount_products.gif"/>]()

<br>
<br>

#### What we have until now:

```javascript
// Review.jsx
//
import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {/* 

                            THE PRODUCTS
    
        */}
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        {/* 

                            THE TOTAL
    
        */}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
```

<br>
<br>
<br>
<hr>
<br>

# 🍌 🐒

2:49:37

## ADDING the 'back step' button

<br>

[<img src="/src/img/checkout_TOTAL--amount_products.gif"/>]()

### Just below the products quantity,total, shipping info etc block, we will be adding the <u>STRIPE</u> elements for the payment

<br>

#### Lets continue: go to the <u>PaymentForm.jsx</u> and add the following:

- The **< Divider />** is going to divide the **Review component** data and the **Payment details** that we will be adding now.

<br>

```javascript
const PaymentForm = ({ checkoutToken }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      // ----------------- DIVIDER
      <Divider />
      // ----------------- DIVIDER
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment methods
      </Typography>
    </>
  );
};

export default PaymentForm;
```

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
