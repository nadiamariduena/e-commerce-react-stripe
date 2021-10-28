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

<br>
<br>
<br>

# 🐒

## Check the responsiveness

- The welcome page is fine
- the basket is also correct (there s not things moving around)

<br>

- But from the moment you click on the **checkout** there s an issue

> Usually you could correct this with an **overflow hidden** inside the \* the start in your main css/scss like so:

```scss
* {
  overflow: hidden;
}
```

<br>

### BUt since we are using material UI we will approach the issue differently:

- Import the **CssBaseline**

<br>

```javascript
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  CssBaseline, 👍
  Divider,
  Button,
} from "@material-ui/core";
```

<br>

### Then add it here:

```javascript
// Checkout.jsx
   return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
```

<br>

### RESULT of the Cssbaseline

<br>

[<img src="/src/img/resposive_form_Cssbaseline.gif"/>]()

<br>
<br>
<br>
<br>

# :sunflower:

### Now lets see if the rest of the form is correctly responsive

[<img src="/src/img/resposive_form_Cssbaseline2_spinner.gif"/>]()

<br>

- **So everything is fine**

- If you notice the right side (where the errors are)

> You can see that first we have the 422 error due to the card authentication (maybe because we are still on testing mode), then after that comes the message **cart empty** 🔴..lets solve that

### Lets solve the 'empty cart' after we conclude the order

- So as i said, you have to check the errors inside the inspector in the browser to see what i am talking about

## Add the following:

- Inside the catch add the: history.pushState('/') , also dont forget to import it inside the link.

<br>

- Since the **history** is a hook from react-router-dom, you have to pass it in a variable to use it in the **catch**

```javascript
// Checkout
// 1
import { Link, useHistory } from "react-router-dom";
//
// 2
//----------- Here we will create the TOKEN -----
const [activeStep, setActiveStep] = useState(0);
const classes = useStyles();
// related to the cart error at the very end of the project
const history = useHistory();
//----------- Here we will create the TOKEN -----
// 3
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (error) {
        // So if there is an error,
          // we push you back to the home page
          history.pushState('/');
        }
      };
```

<br>

## So what the history.pushState('/') is doing, is practically redirecting the client to the welcome page <u>if there is an ERROR</u>, so its like a link that you dont click.

> The error can be for example, like when the client actually order something but somehow by mistake the client refresh the page, and then **commercejs** is not going to be able to create the **token**, because the cart is empty.

<br>
<br>

### Now lets check a last thing

> In case we deleted the credit card, (he didnt show which card) but he made a test of passing an order with the same fake card but instead of having a succesful confirmation, the spinner is going to appear (with no end)

- So to avoid that we are going to set a **a time out function** depending of the data we will have, all that to mimic a response

<br>

- For example, lets say that 2 or 3 seconds pass, we are going to say:**thank you for your purchase, its done**, So in that case we have to start a **time out** when we actually click the button

<br>

### Inside the Checkout.jsx

1. add this state: const [isFinished, setIsFinished] = **useState(false)**;

<br>

2. inside the time out, you will **set** the state to **true**

- IN here we are going to be able to start a **time out** and then after a few second past, **we want to change something**

```javascript
// Checkout.jsx
//
// related to the cart error at the very end of the project
const history = useHistory();
//----------- Here we will create the TOKEN -----
//
// related to the time out Spinner, which is
// connected to the function that nests the 'history'
const [isFinished, setIsFinished] = useState(false);
/*



  */
//  ----------------------TIMEOUT----------
//
const timeout = () => {
  setTimeout(() => {
    setIsFinished(true);
  }, 3000);
};
//  ----------------------TIMEOUT----------
/*



  */
```

<br>
<br>

### Then based on the const timeout = () => function, we can show something here below:

```javascript
   ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
```

<br>

### But first we need to call the 'timeout' function as soon as we click the 'pay button'

- We can do that by passing the function as **PROPS** here

```javascript
// Checkout.jsx
//
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      nextStep={nextStep}
      backStep={backStep}
      onCaptureCheckout={onCaptureCheckout}
      // spinner props to be send to PaymentForm.jsx 👍
      timeout={timeout}
    />
  );
```

### Now send the props to the PaymentForm.jsx

```javascript
//
const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
  timeout,
}) => {
```

### Then you can call the function 'timeout' here:

```javascript

      onCaptureCheckout(checkoutToken.id, orderData);
      //
      //
      // this is related to the spinner function inside the Checkout.jsx
      // this spinner function will be called here, and the reason for that
      // is because 'here we are practically done' with the checkout
      timeout();
      // this calling will make
      //  that the spinner stops after the time is done
      //
      //

      nextStep();
    }
  };
```

### A last thing, inside the Checkout.jsx we will add a last ternary

```javascript
    ) : isFinished ? () : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  //
```

- **meaning:** if this thing is finished, we want to show a new block of code here **()** and if its not finished, we want to the same old circular progress **< CircularProgress />**

<br>

### At this point you will have an error but we will solve that

- Copy the entire confirmation and remove a couple of things:

```javascript
<>
  <div>
    <Typography variant="h5">
      Thank you for your purchase, {order.customer.firstname}{" "}
      {order.customer.lastname}!
    </Typography>

    <Divider className={classes.divider} />
    <Typography variant="subtitle2">
      Order ref: {order.customer_reference}
    </Typography>
  </div>
  <br />
  <Button component={Link} variant="outlined" type="button" to="/">
    Back to home
  </Button>
</>
```

### once you remove it, it should look like this:

```javascript
<>
  <div>
    <Typography variant="h5">Thank you for your purchase,</Typography>

    <Divider className={classes.divider} />
  </div>
  <br />
  <Button component={Link} variant="outlined" type="button" to="/">
    Back to home
  </Button>
</>
```

### SO the whole thing should look like this

```javascript
const timeout = () => {
  setTimeout(() => {
    setIsFinished(true);
  }, 3000);
};

/*
  
  
  
  */
//
let Confirmation = () =>
  order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}!
        </Typography>

        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase,</Typography>

        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
//
//
```
