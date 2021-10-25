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
</div>
```
