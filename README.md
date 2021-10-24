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
- 8. token-countries-dropdown-1



  // For each country, what we wanna do? we want to return,
  // a block of JSX, in this case it will be:<MenuItem and its content
-->

<br>

- This is the continuation of **token-countries-dropdown-1**, is still related to the Checkout button

<br>

# 🍍

[<img src="/src/img/token_object-array-convertor-id-and-label2.gif"/>]()

<br>
<br>
<br>

<br>

# Countries Subdivisions

2:23:02

#### What we will do in this phase, is to repeat what we did when creating the countries

- First step will be to **FETCH** the subdivisions, (_now you understand why we needed to have the countries first before having the subdivisions_)

<br>

```javascript
//
// FETCH SUBDIVISIONS
// SO THIS async function is going to accept 1 param, and that param is
// is going to be a : countryCode
// (_now you understand why we needed to have the countries first before having the subdivisions_)
const fetchSubdivisions = async (countryCode) => {
  // So we are going to be fecthing subdivisions for 1 specific country:
  const { subdivisions } = await commerce.services.loca;
  leListSubdivisions(countryCode);
  // make sure to put it as plural 👍
  setShippingSubdivisions(subdivisions);
  //1 we get the keys out of the subdivisions with the help of the: Object.keys
  //   singular subdivision 👍
  setShippingSubdivision(Object.keys(subdivisions)[0]); //2 and then we get the first element [0])
};
```

### So When are we actually going to call this fetchSubdivisions function?

- **we cannot call** it after the fetchShippingCountries, like so:

```javascript
useEffect(() => {
  fetchShippingCountries(checkoutToken.id);
  fetchSubdivisions(); //here
}, []);
```

#### Because at that time we dont yet have the countries, So what we have to do is create another <u>useEffect</u>

<br>

## Maybe it s the first time you are seeing 2 different use effects in the same functions

- Apparently **there isn't a single rule that forbids you from having multiple useEffects**, and its a good practice of course if you really need it.

<br>

```javascript
useEffect(() => {
  //  2 and of course we have to provide the: shippingCountry, which is in the state, check all the states here below
  fetchSubdivisions(shippingCountry); //here
  // 1 whenever the [shippingCountry]); changes, we are going to recall the useEffect block
}, [shippingCountry]);
```

<br>

##### all the states

```javascript
const [shippingCountries, setShippingCountries] = useState([]);
const [shippingCountry, setShippingCountry] = useState("");
const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
const [shippingSubdivision, setShippingSubdivision] = useState("");
const [shippingOptions, setShippingOptions] = useState([]);
const [shippingOption, setShippingOption] = useState("");
```

<br>

### But Sometimes this is going to be empty [shippingCountry]); and because of that we can provide an 'if' statement

<br>

- If (shippingCountry), if shippingCountry exists, only then call the **fetchSubdivisions(shippingCountry);**

> ###### So if we have a shippingCountry, only then show the option

<br>
<br>

# 🐒

### And that was all for the Subdivisions !!

- Now we have to do the same as we did with the countries, **loop** over them and then display them based on them.

<br>

#### The situation is going to be completely similar to what we did with the countries (when converting to a 2d array and then to an array), so we can copy the line below:

```javascript
// ARRAY CONVERTER
const countries = Object.entries(shippingCountries).map(([code, name]) => ({
  id: code,
  label: name,
}));
```

### And adapt it to the subdivisions

```javascript
// ARRAY CONVERTER Subdivisions
const subdivisions = Object.entries(shippingSubdivisions).map(
  ([code, name]) => ({
    id: code,
    label: name,
  })
);
```
