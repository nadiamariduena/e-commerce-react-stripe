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

- This is the continuation of **stripe-1**, is still related to the Checkout button

<br>

# 🌞

[<img src="/src/img/button-PAY-create-account-stripe-for-this-to-work.gif"/>]()

<br>
<br>
<br>

<br>

# CHECKOUT: / STRIPE 2

2:55:02

<br>
<br>

### Now Everything is ready to make the connection with stripe, so lets make account there.

1.  Open an account [STRIPE](https://stripe.com/en-de)

<br>

2. Once you got verified, click on the developers

[<img src="/src/img/developers-stripe.jpg"/>]()

<br>

3. Look for API keys **(in the left side column)**

[<img src="/src/img/developers-stripe_api.jpg"/>]()

## 4. grab the API key that says: Publishable key (the code)

#### ⚠️ You should never ever Publish this type of sensitive data (keys) or the data that is inside the .env folder, thats why i decided to make this repository private until the project was ready, so that i could replace the sensitive data that i already "commited to git".

- You can either hide the repo and publish just the code **(without the keys of course)** but by doing that you will lose all the commitments.

<br>

#### [Should I add .env to .gitignore?](https://salferrarello.com/add-env-to-gitignore/)

- Yes there is a **way to replace it but it s hard, in case you already pushed in several branches**, it s easier to just create a new shop in commercejs and stripe to obtain **new keys** to use in a new repo (**of course you will have to delete the old shop so to make the old keys obsolete**)

<br>
<br>

<br>

### Now that we have the key, we are not going to add it here below:

- Because as we said, **its sensitive data**

```javascript
// PaymentForm.jsx
//
//STRIPE 2
const stripePromise = loadStripe("...");
```

<br>

### We are going to add the key inside the .env

```javascript
// what we already have / related to commercejs
REACT_APP_CHEC_PUBLIC_KEY = pk_veryLongcodeeeee;
// related to stripe
REACT_APP_STRIPE_PUBLIC_KEY = pk_verylongcodeee;
```

### After you do that

- CLOSE THE TERMINAL /strg+c
- and relaunch it /npm start

### Now copy the variable related to stripes

> REACT_APP_STRIPE_PUBLIC_KEY

### And paste it here:

```javascript
// replace this
//
//STRIPE 2
const stripePromise = loadStripe("...");
//
// for this
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
```

<br>

### Now that we connected stripe to our project, we can finally create that handleSubmit function

<br>

## 🌞

#### This is going to be the finally function that finalizes the ORDER

```javascript
//
const PaymentForm = ({ checkoutToken, backStep }) => {
  //
  //
  const handleSubmit = () => {


  };

  return (
```

<br>

#### But where are we calling this function?

- We are calling it **inside the form**
- inside the form function handleSubmit={e, 1, 2}, we need to **pass 3 parameters**

```javascript
<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
```

<br>

### Pass them also inside the matrix function handleSubmit

- He added event instead of e, lets see if this causes issues :)

```javascript
const PaymentForm = ({ checkoutToken, backStep }) => {
  //
  //
  const handleSubmit = (event, elements, stripe) => {


  };

  return (
```

<br>

### add the event.preventDefault();

- This is going to make sure our website **dont refresh after we click the button**

<br>

#### NEXT: lets add some error handling

```javascript
const PaymentForm = ({ checkoutToken, backStep }) => {
  //
  //
  const handleSubmit = (event, elements, stripe) => {
    event.preventDefault();
    //
    //
    // If no stripe or no elements, then return, we are going outside and not doing anything
    // Stripe cannot do anything if we dont have this 2 things
    if (!stripe || !elements) return; //ERROR HANDLING
    //
    // the cardElement is coming from @stripe/react-stripe-js on top in the imports
    const cardElement = elements.getElement(CardElement);
    //
  };
```

<br>
<br>

## Now we are going to use 'stripes' API to create a payment method

- the **card: cardElement** variable makes reference to the card we just created: const cardElement = elements.getElement(CardElement);

```javascript
const PaymentForm = ({ checkoutToken, backStep }) => {
  //
  //
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    //
    //
    // If no stripe or no elements, then return, we are going outside and not doing anything
    // Stripe cannot do anything if we dont have this 2 things
    if (!stripe || !elements) return;
    //
    // the cardElement is coming from @stripe/react-stripe-js on top in the imports
    const cardElement = elements.getElement(CardElement);
    //
    //
// Now we are going to use 'stripes' API to create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    //
    //
  };
```

### At this point you will have an error, and it s due to the async that we forgot to add here:

> const handleSubmit = async (event, elements, stripe) => {

<br>
<br>

## Now that we have the error and the payment method:

```javascript
// error
if (!stripe || !elements) return;
//
// payment method
const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: "card",
  card: cardElement, //this is linked to the line above
});
```

<br>
<br>

### The following IF/ELSE check will serve to show all of the data to fullfill the order, in case of course there's no ERROR ;)

- READ ALL THE STEPS

```javascript
const PaymentForm = ({ checkoutToken, backStep, shippingData }) => {
  //
  //
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    //
    //
    // If no stripe or no elements, then return, we are going outside and not doing anything
    // Stripe cannot do anything if we dont have this 2 things
    if (!stripe || !elements) return;
    //
    // the cardElement is coming from @stripe/react-stripe-js on top in the imports
    const cardElement = elements.getElement(CardElement);
    //
    //

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    //
    //
    // so if we have the error, we are going to console.log it
    if (error) {
      console.log(error);
    } else {
      // else, if we dont have the error
      // we are going to create a final object containing all the data
      // containing all of the items we have in our cart,
      // containing our customers, who are they? who is buying, first name , last name
      //
      //
      // WE NEED TO STORE that in one final variable:
      const orderData = {
        // We will need all of the following data to send to COMMERCEJS
        //
        //1 we will grab all the data from the checkoutToken
        line_items: checkoutToken.live.line_items,
        //2 then we want to know who is our customer:
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        //3 now specify all of the shipping fields: remember all of this is
        // inside the AddressForm.jsx (if you get error is because you need the props)
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        //4 shipping Options
        fulfillment: { shipping_method: shippingData.shippingOption },
        //5 payment methods
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
            // The payment method we are creating when we call this line:    const { error, paymentMethod } = await stripe.createPaymentMethod({
            //   type: "card",
            //   card: cardElement,
            // });
          },
        },
      };
    }
    //------------------------
    // 6
    //Now we have to call 1 final time our COMMERCE API
    // The commerce Api is going to be call inside the App.js
    // So inside the App.js we have to create that function to fullfil an order

    //
    //
  };
```

<br>

### Add the shippingData (props from AddressForm.jsx) to get rid of the error due to shipping: {

```javascript
const PaymentForm = ({ checkoutToken, backStep, shippingData }) => {
```

<br>
<br>

## Now got to the App.js and add the new function

- We will to call 1 final time our **COMMERCE API**

- So this function is going to **complete** the order

```javascript
//--------------------------------------
//
//        This is the last function
//    this function is related to the stripes inside
//            the PaymentForm.jsx
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  // This function is going to have a try and catch block (if something goes wrong)
  try {
    // This is the order, so once we have the order, we want to set this up to the state
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
  } catch (error) {}
};
//
//
//
//
//--------------------------------------

useEffect(() => {
  fetchProducts();
  fetchCart();
  //
}, []);
```

<br>

### This is the order 'const incomingOrder', so once we have the order, we want to set this up to the sate, go up and create one final state field

```javascript
// -------------- stripes -----------------
// related to the final phase of the project/
// it related to the stripes and the conclusion of the order
const [order, setOrder] = useState({});
// -------------- stripes -----------------
//
```

<br>

#### Now we can use this setOrder inside the try and catch to set our INCOMING order to the state

```javascript
setOrder(incomingOrder);
```

<br>

#### Like so

```javascript
//--------------------------------------
//
//        This is the last function
//    this function is related to the stripes inside
//            the PaymentForm.jsx
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  // This function is going to have a try and catch block (if something goes wrong)
  try {
    // This is the order, so once we have the order, we want to set this up to the sate
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );

    //
    setOrder(incomingOrder);
    //
  } catch (error) {}
};

//--------------------------------------
```

<br>
<br>

## :shopping_cart:

### Once we created an order, we also want to REFRESH the entire cart

> **THE REASON FOR THAT:** is because if the order is done, we dont want the items stay in the cart, **because the order is finally concluded**

<br>

### TO SOLVE THAT

- We are going to create this function above the 'order'

```javascript
//--------------------Stripe--------------------
//
//Once the order is concluded, we want to refresh the cart and remove the items
//
const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};
```

<br>

### Now call the function

```javascript
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  // This function is going to have a try and catch block (if something goes wrong)
  try {
    // This is the order, so once we have the order, we want to set this up to the sate
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );

    //
    setOrder(incomingOrder);
    // Calling the refresh order
    refreshCart();
    //
  } catch (error) {}
};
//
```

### To handle the error below:

```javascript
// App.js
      //
    } catch (error) {}
  };
  //
```

### create another state on top of the App,js

```javascript
// -------------- stripes -----------------
// related to the final phase of the project/
// it related to the stripes and the conclusion of the order
const [order, setOrder] = useState({});
// The error
const [errorMessage, setErrorMessage] = useState("");
// -------------- stripes -----------------
```

### Then add it there

```javascript
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  // This function is going to have a try and catch block (if something goes wrong)
  try {
    // This is the order, so once we have the order, we want to set this up to the sate
    const incomingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );

    //
    setOrder(incomingOrder);
    // Calling the refresh order
    refreshCart();
    //
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};
//
```

<br>
<br>

# 🥭

## So now that we have the handleCaptureCheckout, the order, the refreshing/cleaning basket and the errors handling, WE HAVE to pass (props) all of this things to the checkout so to make the connection to the PaymentForm.jsx

- pass the props

```javascript
{
  /* CHECKOUT */
}
<Route exact path="/checkout">
  <Checkout
    cart={cart}
    order={order} //related to the state
    onCaptureCheckout={handleCaptureCheckout}
    error={errorMessage}
  />
</Route>;
```

## Go to the Checkout.jsx and pass the above props

```javascript
//
const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
//
```

### Some of them will have to pass to our PaymentForm.jsx

- grab the onCaptureCheckout and pass it inside the

```javascript
// Checkout.jsx
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      backStep={backStep}
      // HERE ****
      onCaptureCheckout={onCaptureCheckout}
    />
  );
```

### So now if we go to our PaymentForm.jsx

- pass it like so:

```javascript
const PaymentForm = ({ checkoutToken,  backStep, shippingData, onCaptureCheckout }) => {
```

#### And call it here:

```javascript
onCaptureCheckout(checkoutToken.id, orderData);
```

#### like so:

```javascript
const handleSubmit = async (event, elements, stripe) => {
  event.preventDefault();
  //
  //
  // If no stripe or no elements, then return, we are going outside and not doing anything
  // Stripe cannot do anything if we dont have this 2 things
  if (!stripe || !elements) return;
  //
  // the cardElement is coming from @stripe/react-stripe-js on top in the imports
  const cardElement = elements.getElement(CardElement);
  //
  //

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
  });
  //
  //
  // so if we have the error, we are going to console.log it
  if (error) {
    console.log(error);
  } else {
    // else, if we dont have the error
    // we are going to create a final object containing all the data
    // containing all of the items we have in out cart
    // containing our customers, who are we? who is buying, first name , last name
    // WE NEED TO STORE that in one final variable:
    const orderData = {
      // We will need all of the following data to send to COMMERCEJS
      //1 we will grab all the data from the checkoutToken
      line_items: checkoutToken.live.line_items,
      //2 then we want to know who is our customer:
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      //3 now specify all of the shipping fields: remember all of this is
      // inside the AddressForm.jsx (if you get error is because you need the props)
      shipping: {
        name: "Primary",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      //4 shipping Options
      fulfillment: { shipping_method: shippingData.shippingOption },
      //5 payment methods
      payment: {
        gateway: "stripe",
        stripe: {
          payment_method_id: paymentMethod.id,
          // The payment method we are creating when we call this line:    const { error, paymentMethod } = await stripe.createPaymentMethod({
          //   type: "card",
          //   card: cardElement,
          // });
        },
      },
    };
    //------------------------
    // 6
    //Now we have to call 1 final time our COMMERCE API
    // The commerce Api is going to be call inside the App.js
    // So inside the App.js we have to create that function to fullfil an order
    onCaptureCheckout(checkoutToken.id, orderData);
    //
    //
  }
};
```

<br>
<br>

### so Once we conclude the ORDER, we want to move to the next step

```javascript
// PaymentForm.jsx
//a pass it here
const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  onCaptureCheckout,
}) => {
  /*





  */
//b

      //------------------------
      // 6
      //Now we have to call 1 final time our COMMERCE API
      // The commerce Api is going to be call inside the App.js
      // So inside the App.js we have to create that function to fullfil an order
      onCaptureCheckout(checkoutToken.id, orderData);
      //
      //
      //7 so once we conclude the ORDER, we want to move to the next step
      nextStep();
    }
  };
  /*


  */
  return (
```

## now go to the checkout.jsx and add it there

```javascript
const Form = () =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} next={next} />
  ) : (
    <PaymentForm
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      // here -------
      nextStep={nextStep}
      backStep={backStep}
      onCaptureCheckout={onCaptureCheckout}
    />
  );
```

### AT THIS POINT The logic for the completion of the order is DONE!!!! 🔴

- 3:09:09 you will have to set up the payment gateways with a credit card
14:25

<br>

- But you can also mimic a credit card **in order** to get the confirmation, you can see it in the image below 

<br>
<br>

[<img src="/src/img/stripe2ready.gif"/>]()