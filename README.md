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

[<img src="/src/img/stripe2ready.gif"/>]()

<br>
<br>
<br>

<br>

# CHECKOUT / STRIPE 2: Confirmation styling

3:11:23

<br>
<br>

### In this section we will be handling the styling of the "Confirmation" Card

<br>
<br>

## ⚠️ One thing before we continue

- I notice that **the cart is not refreshed/empty** after we concluded the order and received the confirmation.

<br>

#### So to be sure, I inspected the console and i saw this:

## Error '422' 🔴

```javascript
{code: 'incomplete_number', type: 'validation_error', message: 'Your card number is incomplete.'}code: "incomplete_number"message: "Your card number is incomplete."type: "validation_error"[[Prototype]]: Object
//
//
xhr.js:187 POST 422
//
 🚫 Validation/missing fields
index.js:1 payment.gateway: The selected payment.gateway is invalid.
```

> **important** I checked my email to see if i got an order confirmation but there was nothing, at the same time checked I if stripe was receiving something and yes there was something **(all the attempts to order)**, so i think what is happening is that i am not doing the commercejs and stripe connection correctly.

<br>

### Possible reasons:

- Since i am not using any real credit card, it can be that its not emptying the cart because of that

<br>

### After reading a couple of solutions I found the confirmation to my doubts, but at that moment i didnt know _I really needed the credit card_

[Connecting Stripe with Commerce.js](http://support.commercejs.com/en/articles/579874-connecting-stripe-with-commerce-js)

[<img src="/src/img/solution_confirmation-issue.jpg"/>](http://support.commercejs.com/en/articles/579874-connecting-stripe-with-commerce-js)

<br>

# 🍊

# THE SOLUTION

### 1. I really needed to add a credit card inside the commercejs/ settings/ gateway to have the option to insert the stripe credentials

- To see the option to add the stripe credentials like in the video, as i said you need to add your credit card information exactly as its in the card, everything has to match **(i tried adding a fake name using the right card code and it didn't work, same for the country)**

<br>

- Here the card was accepted

[<img src="/src/img/commercejs_accepting_card_before_stripe_credentials.jpg"/>]()

<br>

### 2. Once you get the key box reserved to stripe credentials in commercejs :

- You have to be careful and choose the test version of the public test and the private test

### This are the 2 keys you will need to add inside the stripe box in <u>commercejs</u>

<br>

- Before i got them, I made **sure** I fully completed the merchant account in stripe.

<br>

#### Stripe

[<img src="/src/img/stripe_credentials_has_to_be_in_testMode.gif"/>]()

<br>

#### 3. commercejs

[<img src="/src/img/commercejs_accepting_stripe_credentials1.jpg"/>]()

<br>

#### 4. Grab the last sandbox key, the one on the bottom (dont take the live)

```javascript
// The publishable key from COMMERCEJS
REACT_APP_CHEC_PUBLIC_KEY=pk_test_  
// 
// 
// 
// 
// 
//  The publishable key from STRIPE
// this key MUST* be a: pk_test_ , if its a 'live', it will send an error
// this key is the one in the image above, the one in the first place (not the secret key)
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_
```


[<img src="/src/img/dotenv_accepting__credentials2.jpg"/>]()

<br>

### NOW YOU ARE READY TO GO

- turn off the the server in visual and relaunch it again 

<br>

#### Now Empty the basket and add new products, then order and send the confirmation, wait a couple of seconds until the email arrives, and if you didnt receive anything, check if you had the "email confirmation" notifications selected.

<br>

##### the email: client side

[<img src="/src/img/email_after_confirmation-clientside.gif"/>]()


<br>
<br>

### the email: The Merchant side

[<img src="/src/img/the_order_commercejs___success.gif"/>]()
 