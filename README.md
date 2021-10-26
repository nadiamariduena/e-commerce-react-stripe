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

#### ⚠️ You should never ever Publish this type of sensitive data (keys) or the data that is inside the .env folder, thats why i decided to make this repository private until  the project was ready, so that i could replace the sensitive data that i already "commited to git".

- You can either hide the repo and publish just the code **(without the keys of course)** but by doing that you will lose all the commitments. 

<br>

#### [Should I add .env to .gitignore?](https://salferrarello.com/add-env-to-gitignore/)

- Yes there is a **way to replace it but it s hard**, it s easier to just create a new shop in commercejs and stripe to obtain **new keys** to use in a new repo (**of course you will have to delete the old shop so to make the old keys obsolete**)

<br>
<br>

