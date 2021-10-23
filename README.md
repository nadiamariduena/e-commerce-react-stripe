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

### Console.log it to see if it worked

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

<br>
<br>

#### 🔴

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

[<img src="/src/img/error_checkOut_TOKEN_countries4__SOLVED.gif"/>]()

<br>

### [Check the solution 🖐️ here ](./src/errors.md)

<br>
<br>
<br>

**2:15:59** to continue after the solution of the token issue

<br>
<br>

### Now we have to add back the select field for the countries, then based on the country, we will be fecthing all the other regions

<br>

#### Go back to the AddressForm.jsx 🍍

- Now we are getting the countries but this is not exactly what we want, **if you notice**, all the countries are inside an <u>Object</u>, but we need them in an <u>Array</u> to **loop** over them:

```javascript
{AT: "Austria", CY: "Cyprus", FR: "France", US: "United States"}
```

<br>

- Setting countries in an object like here below, is fine **but how do we actually get the first element in that object?**:

````javascript
const fetchShippingCountries = async (checkoutTokenId) => {
  const { countries } = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );

  console.log(countries);

  setShippingCountries(countries);
};
//```
````

<br>

#### With arrays it would be easy, we just do array[0] to grab the first element.

<br>

- We will proceed like so, this time we will use the individual country, which is: **setShippingCountry**.

- But as we said, we cannot use it like so: **countries[0]);**, or like so: countries.AU (au, for austria) because we are not sure we will always have austria in the options.

```javascript
setShippingCountry(countries[0]);
```

<br>

#### What we will have to do, is to use: (Object.keys())

- **why keys**, because i only want the **keys of the countries**
  <br>

```javascript
// give me just the key of the countries
setShippingCountry(Object.keys(countries));
```

<br>

# [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

> The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.

<br>

#### And the keys of the countries are going to be:

- AT:
- CY:
- FR:
- US:

> So we are going to get an array of: [AT, CY etc]

#### From those countries:

```javascript
{AT: "Austria", CY: "Cyprus", FR: "France", US: "United States"}
```

<br>

#### And then we are going to say, give me the first one [0]

```javascript
// AddressForm.jsx
// give me just the key of the countries
setShippingCountry(Object.keys(countries)[0]);
```

<br>

### So now we have this set up:

```javascript
const fetchShippingCountries = async (checkoutTokenId) => {
  const { countries } = await commerce.services.localeListShippingCountries(
    checkoutTokenId
  );

  console.log(countries);
  setShippingCountries(countries);
  setShippingCountry(Object.keys(countries)[0]);
};
//
```

<br>
<br>

#### Now go down, and if we try to **UNcomment** the first block:

- Focus on the **commented/Hidden** section

```javascript
// AddressForm.jsx
<>
  <Typography variant="h6" gutterBottom>
    Shipping Address
  </Typography>
  {/* FORM */}
  <FormProvider {...methods}>
    <form onSubmit={0}>
      <Grid container spacing={3}>
        <FormInput required name="firstName" label="First name" />
        <FormInput required name="lastName" label="Last name" />
        <FormInput required name="address1" label="Address line 1" />
        <FormInput required name="email" label="Email" />
        <FormInput required name="city" label="City" />
        <FormInput required name="zip" label="Zip / Postal code" />
        {/* ------------ */}
        {/* ------------ */}
        // 1 block
        {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>
           // 2 block
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid> */}
      </Grid>
    </form>
  </FormProvider>
</>
```

### We need to set up a similar procedure with the Object. to use the values in the blocks here below

```javascript
// Before
<Grid item xs={12} sm={6}>
  <InputLabel>Shipping Country</InputLabel>
  // set value here
  <Select value={} fullWidth onChange={}>
    <MenuItem key={} value={}>
      Select me
    </MenuItem>
  </Select>
</Grid>
//
//
// AFTER
  <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
             <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                  Select me
                </MenuItem>
              </Select>
            </Grid>
```

<br>

- **onChange={(e)** => setShippingCountry

> So want to say that **on change** we want the event(e

- (e.target.value)}

> Whatever is selected, we set it to the shipping country

<br>

- **(e.target.value)}** makes allusion to this: **value={shippingCountry}**

<br>
<br>

### Now in here, we want to map over something:

```javascript
onChange={(e) => setShippingCountry(e.target.value)}>

/*
  IN here we want to map over something!!!!!! 👍


*/
 Select me
</MenuItem>
 </Select>

```

#### And the question is, what do we want to map over?

- Remember **countries** are not an array, so we cannot do **{countries.map()}**

<br>

- But what we can do is **{Object.entries()}**, Object.entries is going to give us **keys** and **values** of this Objects

> So **from where do we want to get the entries from?** **ShippingCountries**

```javascript
{
  Object.entries(shippingCountries);
}
```

<br>

# [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

<br>

**The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs.** This is the **same as iterating with a for...in** loop, **except** that a for...in loop enumerates properties in the prototype chain as well.

The order of the array returned by Object.entries() is the same as that provided by a for...in loop. If there is a need for different ordering, then the array should be sorted first, like Object.entries(obj).sort((a, b) => b[0].localeCompare(a[0]));.

<br>
<br>
<br>

### Now we have an array of an array, lets console.log it

```javascript
{
  console.log(Object.entries(shippingCountries));
}
```

[<img src="/src/img/token_array-of-array_key_countries1.gif"/>]()

<br>
<br>

# 🐒

### Here you can see that we already have a dropdown with options, but we still dont _see_ the countries options

[<img src="/src/img/token_array-of-array_key_countries2.gif"/>]()

<br>

### SO now that we have an array, we can officially LOOP over it:

```javascript
// before loop
{
  console.log(Object.entries(shippingCountries));
}
//
//
// after loop 1. option
{
  Object.entries(shippingCountries).map(keyValuePair);
}
```

### But the teacher prefers destructuring the array

- By the way the **keyValuePair** gave me an error

### So while destructuring, the first element is going to be 'code' , and the second element is going to be the name of that country

```javascript
{
  Object.entries(shippingCountries).map([code, name]);
}
```

<br>

## 🔴

### After that i get this error

```javascript
Failed to compile.

src/components/CheckoutForm/AddressForm.jsx
  Line 77:57:  'code' is not defined     no-undef
  Line 77:63:  Unexpected use of 'name'  no-restricted-globals

Search for the keywords to learn more about each error.
```

<br>

#### Since we are getting lost with the parenthesis, lets move this line on top of the AddressForm, to make it cleaner.

```javascript
// Move this messy line out of the jsx
   {Object.entries(shippingCountries).map([code, name]=>())}
  //
  //
  // move it under the const methods

  const countries  =  Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
  //
  //

```

<br>
<br>
<br>

# Explanation of this line

```javascript
const countries = Object.entries(shippingCountries).map(([code, name]) => ({
  id: code,
  label: name,
}));
//
```

### ... IN OTHER WORDS 👍

this Object.entries , will convert this:shippingCountries into a 2d array **so from object to array**, then we have to .map it one more time: .map(([code, name]), **to turn it into a normal array**, from that procedure we get the code and the name , and what we are returning **=>**? , we return an **array** that has **objects** that contains: the **id** and the **label**

<br>

### Now lets console log it to see how the array looks like

```javascript
// ARRAY CONVERTER
const countries = Object.entries(shippingCountries).map(([code, name]) => ({
  id: code,
  label: name,
}));

console.log(countries);
```

<br>

- As you can see in the image: we got the id and the label

[<img src="/src/img/token_object-array-convertor-id-and-label.gif"/>]()

<br>
<br>

### Now lets finally use it and map the countries, go to the commented section again:

- Add the menu inside the .map **(dont bother about the error, its because the .map is empty)**, also because of the key, but we will work on that soon

```javascript
{
  countries.map((country) => (
    <MenuItem key={} value={}>
      Select me
    </MenuItem>
  ));
}
```
<br>

[<img src="/src/img/token_object-array-convertor-id-and-label3.gif"/>]()

<br>

### This is going to show the country options inside the dropdown in the form

```javascript
{
  countries.map((country) => (
    <MenuItem key={country.id} value={country.id}>
      {country.label}
    </MenuItem>
  ));
}
```

[<img src="/src/img/token_object-array-convertor-id-and-label2.gif"/>]()
