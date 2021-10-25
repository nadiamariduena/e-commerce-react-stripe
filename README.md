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

- This is the continuation of **token-shipping-Subdivisions**, is still related to the Checkout button

<br>

# 🍍

[<img src="/src/img/token_subdivisions1-success.gif"/>]()

<br>
<br>
<br>

<br>

# Countries/ Shipping Options

2:27:50

#### What we will do in this phase, is more or less repeat <u>what we did when creating the shipping subdivisions</u>, but there are a couple of things that are going to be different.

- First step will be to **FETCH** the options from the **commerce.**

<br>

- This **fetchShippingOptions** is going to accept a few things **async()**

<br>

- **checkoutTokenId, country, region = null**, we can set the region to be equal to **null**, in case there is none.

<br>

- So now that we have that, **we will be fetching the Options**: const options = await **commerce.checkout.**...

<br>

- The **checkout.** is coming from the **Checkout.jsx** line 37

<br>

- Here you specify the country you are and the region: **{country, region }**, This is going to make sure to get a specific shipping option for this country and region

  <br>

- Now that we have these options, add the following:

```javascript
// plural
setShippingOptions(options); //this is an array
// individual
setShippingOption(options[0].id); //grabing the 1 from the array on top
```

<br>

```javascript
//
// FETCH OPTIONS 3
const fetchShippingOptions = async (
  checkoutTokenId,
  country,
  region = null
) => {
  const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
    country,
    region,
  });
  //
  //
  setShippingOptions(options);
  setShippingOption(options[0].id);

  //
};
//
```

<br>
<br>

<!-- [<img src="/src/img/token_subdivisions1-success.gif"/>]() -->

## Now the Question is, when do we get the Shipping Options?

- The answer is, we get them after we get the subdivisions, so we **first** we get the countries, then we get the **subdivisions** ,then we get the countries.

<br>

# 🌞

# So we can use <u>ANOTHER</u> useEffect here:

<br>

- This new UseEffect is going to run after the **}, [shippingSubdivision]);** changes. so if you look at the **3 useEffect** we have now, the second one waits until the first one which is the country 'changes', the 3 one waits until the second one changes, (**all in an structured way, as we need the asnwers from the top, so that the below can work <u>depending of the answers</u>**)

<br>

```javascript
//
//1
// Countries
useEffect(() => {
  fetchShippingCountries(checkoutToken.id);
}, []);
//
//
// waits for no. 1
//Subdivisions
useEffect(() => {
  if (shippingCountry) fetchSubdivisions(shippingCountry);
}, [shippingCountry]);
//
//
//
//waits for no.2

// Options
useEffect(() => {
  if (shippingSubdivision)
    fetchShippingOptions(
      checkoutToken.Id,
      shippingCountry,
      shippingSubdivision
    );
}, [shippingSubdivision]);
//
//
```

<br>

## Explanation of the 3. useEffect (read the comments)

```javascript
//
// Options
useEffect(() => {
  //1 If shippingSubdivision exists, we want to fetch: fetchShippingOptions
  if (shippingSubdivision)
    //2   We want to pass: checkoutToken.Id which is coming from Props,
    //  The **checkoutToken.Id** is coming from the **Checkout.jsx** line 37
    fetchShippingOptions(
      checkoutToken.Id,
      shippingCountry,
      //3 Then we want to pass the ShippingCountry which is coming from our 'states' line 25 AddressForm.jsx
      //
      shippingSubdivision
    );
  // 4 finally we have to loop over it
}, [shippingSubdivision]);
//
//
```

<br>

### Now that the UseEffect is ready, we have to move to the top and Loop over it. BUT WHY arent we converting it with Object.entries, like we did for the countries and subdivisions?

<br>

##### THE REASON: its because 'ShippingOptions' are an array by default.

```javascript
// OPTIONS ***
const options = shippingOptions.map(() => ({
  //
  //      HERE  **
  //
}));
```

<br>

- To see it more clearly, you can console.log the **options**

<br>

##### Hide the options

```javascript
//
// OPTIONS ***
// const options = shippingOptions.map(() => { => ({

//   }));
//
console.log(shippingOptions);
//
```

> **Result:** You will have a couple of arrays with lots of options, and of course the fields related to the shipping options depending on the country.

[<img src="/src/img/token_array_shipping_pricesOptions.gif"/>]()

<br>
<br>

- We are going to call each specific option **sO** for shopping Options, to be used as an argument

<br>

<br>

```javascript
// OPTIONS ***
const options = shippingOptions.map((sO) => ({
  id: sO.id,
  label: `${sO.description} ~ (${sO.price.formatted_with_symbol}) `,
}));
//
// console.log(shippingOptions);
//
```

<br>

### After this go to the bottom and uncomment the last Grid

```javascript
{
  /*      <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid> */
}
```

<br>

#### Copy this from the subdivision grid:

```javascript
{
  subdivisions.map((subdivision) => (
    <MenuItem key={subdivision.id} value={subdivision.id}>
      {subdivision.label}
    </MenuItem>
  ));
}
```

<br>

### And paste it inside:

```javascript
<Grid item xs={12} sm={6}>
  <InputLabel>Shipping Options</InputLabel>
  <Select value={} fullWidth onChange={}>
{
  subdivisions.map((subdivision) => (
    <MenuItem key={subdivision.id} value={subdivision.id}>
      {subdivision.label}
    </MenuItem>
  ));
}
  </Select>
</Grid>
```

<br>

### Change a couple of things, starting by the value and the onChange={}>

```javascript
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
```

<br>
<br>

### Now we are looping through the options

<br>

## Now lets check the differences between block a and b

```javascript
{
  /* 
            
            
        A
            
            
*/
}
<Grid container spacing={3}>
  <FormInput required name="firstName" label="First name" />
  <FormInput required name="lastName" label="Last name" />
  <FormInput required name="address1" label="Address line 1" />
  <FormInput required name="email" label="Email" />
  <FormInput required name="city" label="City" />
  <FormInput required name="zip" label="Zip / Postal code" />
  {/* 
            
            
            
            B 
            
            
*/}

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
      onChange={(e) => setShippingSubdivisions(e.target.value)}
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
</Grid>;
```

<br>

- All of the inputs in block a , are Custom components (**check: FormInput.jsx**)

#### Now that i see, we dont need to have it like so

```javascript
// FormInput.jsx
// replace this
const FormInput = ({ name, label, required }) => {
//
 required={required}
//

// for this
const FormInput = ({ name, label }) => {
    //
    required
```

<br>

### Also inside the addressForm.jsx

```javascript
// replace this:
 <FormInput required name="firstName" label="First name" />
<FormInput required name="lastName" label="Last name" />
<FormInput required name="address1" label="Address line 1" />
<FormInput required name="email" label="Email" />
<FormInput required name="city" label="City" />
<FormInput required name="zip" label="Zip / Postal code" />

//
//
// for this:
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address line 1" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
            {/* ------------ */}
```

<br>

### the reason for removing the required is because 1 is enough to reach the all, since the 'custom fields' inside the FormInput.jsx is the parent of all of them.

<br>
<br>
<br>

## Back to the code, it didnt work!

- Certainly there s something happening (empty dropdown) but i am not getting the shipping options

<br>

##### This is the code after the video (in the repo the code is different)

## 🍌

- After few minutes of checking some typo mistakes (i found 2), I could finally make it work, also the error 404 that you saw ABOVE, also disappeared!!!

<br>

- The error came from the fetch options function and the useEffect, i also checked the Checkout.jsx and tried to clean it a bit

<br>

## The code corrected

```javascript
import React, { useState, useEffect } from "react";
//
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
//
import { commerce } from "../../lib/commerce";

//
import FormInput from "./FormInput";
//
//
const AddressForm = ({ checkoutToken }) => {
  //

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  //

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  // console.log(countries);
  //

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} ~ (${sO.price.formatted_with_symbol}) `,
  }));
  //
  console.log(options);
  //
  //-------------

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    // we get the keys out of the countries with the help of the: Object.keys
    setShippingCountry(Object.keys(countries)[0]);
  };
  //
  //-------------

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    // plural
    setShippingSubdivisions(subdivisions);
    //1 we get the keys out of the subdivisions with the help of the: Object.keys
    // individual subdivision
    setShippingSubdivision(Object.keys(subdivisions)[0]); //2 and then we get the first element [0])
  };

  //-------------

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  //
  //
  // Countries

  //
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  //
  //
  //Subdivisions

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  //
  //
  //
  // Options
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  //
  //
  //
  //
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit="">
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
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
```

[<img src="/src/img/shippingOptions_finallyShowing.gif"/>]()

<br>
<br>
<br>

#### This line

```javascript
const options = shippingOptions.map((sO) => ({
  id: sO.id,
  label: `${sO.description} ~ (${sO.price.formatted_with_symbol}) `,
}));
```
