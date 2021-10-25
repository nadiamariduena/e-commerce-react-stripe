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


  // For each country, what we wanna do? we want to return,
  // a block of JSX, in this case it will be:<MenuItem and its content
-->

<br>

- This is the continuation of **token-shipping-Options**, is still related to the Checkout button

<br>

# 🍊

[<img src="/src/img/shippingOptions_finallyShowing.gif"/>]()

<br>
<br>
<br>

<br>

# FORM / THE NEXT BUTTON

2:35:23

- At this point the first part of the checkout is fully functional, the next step will be to add the **next button** and after that we will finally check the **payments details**.

<br>

#### Inside the AddressForm.jsx

- This are the only styles we will add in this way, as the teacher didnt want to create another **styles.js** file.

<br>

- I added a margin of 20px, inside the div that is nesting the 2 buttons.

<br>

```javascript
import { Link } from "react-router-dom";
//
//
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  }}
>
  <Button component={Link} to="/cart" variant="outlined">
    Back to Cart
  </Button>
  {/* blue button */}
  <Button type="submit" variant="contained" color="primary">
    Next
  </Button>
</div>;
```

<br>
<br>

### Right now the only button that is going to work is: Back to Cart

<br>

## So lets work in the functionality of the 'next' button

<br>

- If you notice, in our Form, the <u>On submit </u>is empty

<br>

```javascript
// AddressForm.jsx
//

        <form onSubmit="">
```

<br>

### To use this onSubmit, we need to create a new function but inside the Checkout.jsx

- we are going to pass this function as **PROPS** to our AddressForm.jsx

<br>

- Of course the function is **going to accept the '(data)'**

<br>

```javascript
// we are going to pass this function
//  as PROPS to our AddressForm.jsx
// Of course the function is going to accept the 'data'
// So what are we going to do with that 'data
const next = (data) => {};
```

#### So what are we going to do with that 'data ?

<br>

##### We are going to **set** it to the shipping data right here:

- Create a new state

```javascript
// Checkout.jsx
//
// All the shipping data(countries,subDivs,options) will pass through this below
const [shippingData, setShippingData] = useState({});
// the useState in the beginning is going to be an empty object
//
```

<br>

### So once we have the shipping 'data' what we have to do to get that data 'populated'?

- Simply say: **setShippingData(data)**, and then we use that data that we passed here: **const next = (data) => {};**

<br>

```javascript
const next = (data) => {
  setShippingData(data);
};
```

<br>

## Of course after we 'set the shipping data', we want to move the 'setActiveStep' by one further, so just about the next function, we are going to create 2 new functions:

```javascript
// what we have right now
const [activeStep, setActiveStep] = useState(0);
```

<br>

- One function is going to be call: const **nextStep** and that function is going to <u>setActiveStep</u> to step + 1, when you are setting the state in react, **using the previous state**, you have to call it as a call back function **(()=>)**, and then in here **((prevActiveStep)=>)** you get previous Active step, so what you can say is just return **=>** prevActiveStep + 1.

<br>

### 🔴

#### This way we are not mutating the old state, we are using it as a previous step + 1

```javascript
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
```

<br>

#### [Why Not To Modify React State Directly](https://daveceddia.com/why-not-modify-react-state-directly/)

### Lets Continue

#### Duplicate the line

- But instead of next add back and instead of + add a -

```javascript
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
```

<br>

### Now we know that after setting the shipping data, we are going to call the next step()

```javascript
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
// we are going to pass this function
//  as PROPS to our AddressForm.jsx
// Of course the function is going to accept the 'data'
// So what are we going to do with that 'data
const next = (data) => {
  setShippingData(data);
  //
  nextStep();
};
```

<br>
<br>
<br>
 
 ## The next function is going to be passed here:

- You will pass the next function inside the AddressForm

```javascript
//Checkout.jsx
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm />
  );
```

<br>

## Now lets go back to the AddressForm.jsx to pass the 'next' function we just created, as Props

```javascript
const AddressForm = ({ checkoutToken, next }) => {
```

#### and then use it inside the 'onSubmit'

- You will have to pass some parameter inside next())}

```javascript
  <form onSubmit={methods.handleSubmit((data)=> next())}>
```

<br>

### So what are we going to give it?

- First of all we are going to give it a new Object{} and that object is going to have all of the properties of the form (we will use the spread **... operator** to grab them all), so we want to **spread this 'data' into this object**

```javascript
next({ ...data });
```

<br>

- below: this is all the properties we are going to grab using the spread **... operator**

```javascript
    <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address line 1" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
```

## But why dont we just use it like so: next(data); instead of doing like so: next({ ...data });

- because if we just add (data) we will only get this:

```javascript
    <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address line 1" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
```

<br>

### While next({ ...data }); , is going to grab the fields below and their states:

<br>

```javascript
<Grid container spacing={3}>
  <FormInput name="firstName" label="First name" />
  <FormInput name="lastName" label="Last name" />
  <FormInput name="address1" label="Address line 1" />
  <FormInput name="email" label="Email" />
  <FormInput name="city" label="City" />
  <FormInput name="zip" label="Zip / Postal code" />
  {/* ------------ */}
  {/* ------------ */}
  <Grid item xs={12} sm={6}>
    <InputLabel>Shipping Country</InputLabel>
    <Select
      value={shippingCountry}
      fullWidth
      onChange={(e) => setShippingCountry(e.target.value)}
    >
      {countries.map((country) => (
        <MenuItem key={country.id} value={country.id}>
          {country.label}
        </MenuItem>
      ))}
    </Select>
  </Grid>

  <Grid item xs={12} sm={6}>
    <InputLabel>Shipping Subdivision</InputLabel>
    <Select
      value={shippingSubdivision}
      fullWidth
      onChange={(e) => setShippingSubdivision(e.target.value)}
    >
      {subdivisions.map((subdivision) => (
        <MenuItem key={subdivision.id} value={subdivision.id}>
          {subdivision.label}
        </MenuItem>
      ))}
    </Select>
  </Grid>

  <Grid item xs={12} sm={6}>
    <InputLabel>Shipping Options</InputLabel>
    <Select
      value={shippingOption}
      fullWidth
      onChange={(e) => setShippingOption(e.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Grid>
</Grid>
```

<br>

### That s why we had to create a new OBJECT{}, so to spread the properties of ...data so that we can pass the shippingCountry,shippingSubdivision,shippingOption

```javascript
       <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
```

#### That s why we are passing the singular values shippingCountry,shippingSubdivision,shippingOption so that later on, it will be easier

- Because we are passing exactly what we need.

<br>
<br>
<br>

# 🍊 🍎

## RECAPITULATION

## 1. we are calling this function from here:

- passing all the necessary 'data'

```javascript
// AddressForm.jsx
 next({...data
```

<br>

## 2. The function declaration is here:

- We are getting all the data from **next = (data)**
- Setting it into the shipping data: **setShippingData(data);**

```javascript
// Checkout.jsx
const next = (data) => {
  setShippingData(data);
  //
  nextStep();
};
```

### 3. Then we have access to the state

```javascript
const [shippingData, setShippingData] = useState({});
```

### 4. Which we can then use to pass it to our second step of the form which is the Payment form.

```javascript
<PaymentForm shippingData={shippingData} />
```

## 5. Based on this shippingData={shippingData} , our payment form will be able to finalize the order.
