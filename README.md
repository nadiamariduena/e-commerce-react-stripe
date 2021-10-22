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

<br>

## Its working!

- So as you can see we have a nice < Paper > in the middle of the screen and inside of it we have the Stepper

[<img src="/src/img/checkout1_working.gif"/>]()

1:45:11

<br>
<br>
<br>

### Now we have to implement the different steps of the Form, as we said, we have the Address form, the payment form and finally the view of the order.

# 🐒

- **Lets start by rendering** 2 different component below the < Stepper >, **depending in which step we are**

<br>

### Best way to do that is by implementing IF STATEMENTS

- We will use 2 for now to declare 3 components "we dont yet have"

<br>

### a. THE FORM function

- this form will **nest the 2 components** steps

```javascript
// step 1
// SO if we are currently in the step === 0
// then we are going to show: <AddressForm />
//  But if we are not in the 1. step,  : We are going to render the  <PaymentForm />
const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
```

<br>
<br>

### b.

- This means

```javascript
{
  // 2. if activeStep is === to steps.length(meaning the last step)
  // 3. then we are going to show another (NEW component) which is <Confirmation />
  // At this point we have 3 new components, we have the <AddressForm /> and the  <PaymentForm />
  // 4. so if we are done with steps.length(last phase), we show confirmation, else : show  <Form />;
  activeStep === steps.length ? <Confirmation /> : <Form />;
  //
  //
  // this form from the above line <Form />, makes allusion to this:
  // const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);
}
```

<br>
<br>
<hr>
<br>

1:47:46

## Now lets create the Forms of the 3 components

- < AddressForm />
- < PaymentForm />
- < Confirmation />

<br>
<br>

# 💰

# PaymentForm and AddressForm

- This is the basic layout, you need it to visualize it inside the Checkout.jsx

<br>

```javascript
// PaymentForm
import React from "react";

const PaymentForm = () => {
  return (
    <>
      <div>Payment Form</div>
    </>
  );
};

export default PaymentFrom;

//
// AddressForm
import React from "react";

const AddressForm = () => {
  return (
    <>
      <div>Address Form</div>
    </>
  );
};

export default AddressForm;
```

<br>

## Import these 2 inside the Checkout.jsx

```javascript
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
```

#### As for the confirmation component, for now its going to be inside the Checkout.jsx, later on we will create perhaps a formal component.

<br>

- Lets create the component

```javascript
const Confirmation = () => <div>Confirmation</div>;
```

<br>

## Before testing: this is what we have until now:

```javascript
import React, { useState, useEffect } from "react";
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

[<img src="/src/img/checkout2_working.gif"/>]()

1:49:11

<br>
<br>

### At this point we cannot navigate through the steps because we still dont have the buttons for updating <u>setActiveStep</u>

```javascript
const [activeStep, setActiveStep] = useState(0);
```

#### But if you are really curious, you can do it manually:

```javascript
// If you change the 0 for 1, you will be able to see the paymente component
const [activeStep, setActiveStep] = useState(1);
```

<br>

[<img src="/src/img/checkout3-confirmation-default.gif"/>]()

1:49:42

<br>
<br>
<br>
<br>

# 🍌

### Now we have to implement the forms one by one, We will start with the <u>AddressForm.jsx</u>

- Our form is going to have a lot of different fields, such as: name, lastname, address. city, zip code, country etc...

> Usually **we need to have many different states for every specific field** (as they need to be updated), that's why we will be using **[React Hook Forms](https://react-hook-form.com/)**

- In the link : **[React Hook Forms](https://react-hook-form.com/)** , You can see the difference between the rerenders of each option.

<br>
<br>

### What is a react hook form?

> React-hook-form is a library that helps you validate forms in React. React-hook-form is a minimal library without any other dependencies. It is performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries.

<br>

## Lets start by importing some things:

```javascript
import React from "react";
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
//
const AddressForm = () => {
  //
  //
  const methods = useForm();
  //
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
    </>
  );
};

export default AddressForm;
```

<br>

#### Next: we will be using the FORM from the react-hook-form

```javascript
<Typography variant="h6" gutterBottom>
  Shipping Address
</Typography>;
{
  /* FORM */
}
<FormProvider></FormProvider>;
```

#### In the form we are going to spread all the methods from the hook : {...methods}

```javascript
<FormProvider {...methods}></FormProvider>
```

#### the form is going to have a 'on submit', that we will leave empty 'for now'.

```javascript
<form onSubmit={}></form>
```

#### The grid is going to be there to separate each our input fields

- The Grid is going to be of 'type' **container**.

- And its going to have a spacing of {3}

```javascript
<form onSubmit={}>
  <Grid container spacing={3}></Grid>
</form>
```

#### Inside of the Grids, we are going to have a special material UI field

- We have to find a way to connect material ui with the form hook

<br>
<br>
<br>

## 🔴 we are going to have this error because we didnt set up a value here:

> <form onSubmit={}> **but dont worry**, we will solve it later. if you dont want to see the error add something like 0

```javascript
27 |
  {
    /* FORM */
  };
28 |
(
  <FormProvider {...methods}>
    > 29 |{" "}
    <form onSubmit={}>
      | ^ 30 | <Grid container spacing={3}></Grid>
      31 |{" "}
    </form>
    32 |{" "}
  </FormProvider>
);
```

### Create 1 more component inside the Checkout Form

- call it **CustomTextField.jsx**

```javascript
import React from "react";

const CustomTextField = () => {
  return <div></div>;
};

export default CustomTextField;
```

<br>

- Inside of it import the following:

```javascript
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

const CustomTextField = () => {
  return <div></div>;
};

export default CustomTextField;
```

<br>

### Then add the Grid items

- The required={required} is going to grab things from props (we dont have them yet)

- **READ THE COMMENTS**

```javascript
const CustomTextField = () => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name} //we are going to get that through PROPS as we dont have it yet
        control={control}
        label={label} //we are also going to get that through props
        fullWidth //each of the articles will have a full grid
        required={required} //then we have to know if the field is required(also coming from props)
        error={isError}
      />
    </Grid>
  );
};
```

<br>

#### 1:55:42

#### Pass the following through PROPS (you have to still create them but pass it anyway)

```javascript
const CustomTextField = ({ name, label, required }) => {
```

## 🔴

#### Change the name of the component

- instead of CustomTextField

- add: **FormInput**

<br>

<br>
<br>
<br>

<br>
<br>

### Now import all the data we just created to the AddressForm.jsx

```javascript
import FormInput from "./FormInput";
```

#### Now we are going to see how powerful this is, and how many lines of code we save by just using this method

```javascript
<FormProvider {...methods}>
  <form onSubmit={0}>
    <Grid container spacing={3}>
      // //*** HERE *** //
    </Grid>
  </form>
</FormProvider>
```

<br>
<br>

#### Inside of the Grid we will pass all the information we need for the form

- We dont have to worry about value
- We dont have to manage the State

##### the only thing we need is this:

```javascript
<FormInput required name="firstName" label="First name" />
```

<br>
<br>

## 🔴 Errors

1:57:00

```javascript
Failed to compile.

src/components/CheckoutForm/FormInput.jsx
  Line 9:23:   'useFormContext' is not defined  no-undef
  Line 14:6:   'Grid' is not defined            react/jsx-no-undef
  Line 22:16:  'isError' is not defined         no-undef

Search for the keywords to learn more about each error.
```

### Most of the errors in that phase were related to:

- Not naming correctly the functions or naming them differently to what is shown in the video tutorial.

##### this is the [official repo of the project](https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/CheckoutForm/CustomTextField.jsx) , where you can spot the differences.

<br>

- Another reason for errors: changes or updates in the form dependency

<br>

#### So here is the code BEFORE AND AFTER the changes (check also the import)

<br>

## BEFORE

```javascript
// before
import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
};

export default FormInput;
```

<br>

### AFTER

```javascript
import React from "react";
//
import { TextField, Grid, InputLabel } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  const isError = false;
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
        variant="outlined"
      />
    </Grid>
  );
};

export default FormInput;
```

<br>

### Result after changes

<br>

[<img src="/src/img/checkout4_formInput.gif"/>]()

<br>
<br>
<br>

### Now that we obtained the field, lets continue to add more of them

- Inside the **AddressForm.jsx** add the following :

```javascript
<Grid container spacing={3}>
  <FormInput required name="firstName" label="First name" />
  // *** new ***
  <FormInput required name="lastName" label="Last name" />
  <FormInput required name="address1" label="Address line 1" />
  <FormInput required name="email" label="Email" />
  <FormInput required name="city" label="City" />
  <FormInput required name="zip" label="Zip / Postal code" />
</Grid>
```

[<img src="/src/img/checkout5_formInput-morefields.gif"/>]()

<br>
<br>
<br>

# 🍌 :monkey:

## The following step is going to be a bit complicated

- We will be implementing **selectors**, like the ones you use when you are buying an article, to be more exact when you have a sort of dropdown with a lot of choices to **select 1**.

<br>

#### Here we will handle 3 phases and they are all connected to each other, so for one to work it needs the data from the other and the other as well.

<br>

##### This are the steps:

- Shipping Country
- Shipping Subdivision
- Shipping Options

<br>
<br>

#### The following will be the default template for the 3 phases

```javascript
<Grid item xs={12} sm={6}>
  <InputLabel>Shipping Country</InputLabel>
  <Select value={} fullWidth onChange={}>
    <MenuItem key={} value={}>
      Select me
    </MenuItem>
  </Select>
</Grid>;
{
  /* 2 */
}
<Grid item xs={12} sm={6}>
  <InputLabel>Shipping Subdivision</InputLabel>
  <Select value={} fullWidth onChange={}>
    <MenuItem key={} value={}>
      Select me
    </MenuItem>
  </Select>
</Grid>;
{
  /* 3 */
}
<Grid item xs={12} sm={6}>
  <InputLabel>Shipping Options</InputLabel>
  <Select value={} fullWidth onChange={}>
    <MenuItem key={} value={}>
      Select me
    </MenuItem>
  </Select>
</Grid>;
```

<br>

2:02:06

### But why is this going to be difficult?

- Lets start by the end of the above code:

> You dont know which **Shipping Options** do you have, until you know in which **Shipping Subdivision** are you, but you dont know which **Shipping Subdivision** do you have, until you know in which **Shipping Country** you are.

<br>

- So for each change of the country (**Shipping Country**), you will gave to change these 2: **Shipping Subdivision** and **Shipping Options**. WHEN YOU LOOK AT IT it s logic because you dont have the same shipping options for international for example.

<br>
<br>

#### 🔴

### Right now we have this error, but its related to the empty values in the grid default we just duplicated

```javascript
  40 |             <Grid item xs={12} sm={6}>
  41 |               <InputLabel>Shipping Country</InputLabel>
> 42 |               <Select value={} fullWidth onChange={}>
     |                             ^
  43 |                 <MenuItem key={} value={}>
  44 |                   Select me
  45 |                 </MenuItem>
```

<br>
<br>

<br>

# 🍌

## Lets start by adding the states for each of the following:

- Shipping Country
- Shipping Subdivision
- Shipping Options

<br>

### But before, import the UseState inside the AddressForm.jsx

```javascript
import React, { useState } from "react";
```

 <br>

### There will be 6 states in total for the following:

- Shipping Country
- Shipping Subdivision
- Shipping Options

<br>

> // 1 state
> // by default our shipping countries,
> // are going to be set to an **EMPTY array**: useState([]);
> // but not all of them are going to be an empty array, **we will also have empty strings useState('')**

<br>

- **Notice** the plural for certain options:

```javascript
const [shippingCountries, setShippingCountries] = useState([]);
const [shippingCountry, setShippingCountry] = useState("");
//
const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
const [shippingSubdivision, setShippingSubdivision] = useState("");
//
const [shippingOptions, setShippingOptions] = useState([]);
const [shippingOption, setShippingOption] = useState("");
```

<br>

#### We now have access to all of the "state fields" we are going to use, now lets use the things from the API to "fetch" all the available countries, to fetch all the ShippingSubdivisions and and to fetch all ShippingOptions, for our costumers: methods = useForm();

<br>

- if you remember, the following 'below' are the things we set up when we created the **commercejs**

```javascript
const [shippingCountries, setShippingCountries] = useState([]);
const [shippingCountry, setShippingCountry] = useState("");
//
const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
const [shippingSubdivision, setShippingSubdivision] = useState("");
//
const [shippingOptions, setShippingOptions] = useState([]);
const [shippingOption, setShippingOption] = useState("");
```

<br>

#### Now to able to use all our API features, we are going to import:

```javascript
import { commerce } from "../../lib/commerce";
```

<br>

#### Once imported, we are going to implement the functionalities to fetch the ShippingCountries, ShippingSubdivisions and ShippingOptions using the commercejs API

<br>
<br>
<br>

#🍍

## Lets start with Countries

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

## INITIALLY we are going to leave it as a component did mount, which means its only going to have an empty dependency array, so its only going to happen to the start <u>but later on we are going to change it when the cart changes</u>

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
