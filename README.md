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
    fetchShippingOptions(checkoutToken.Id, shippingCountry, shippingSubdivision);
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
