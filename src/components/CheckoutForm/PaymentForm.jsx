import React from "react";
//
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
//
//STRIPE 1
import { loadStripe } from "@stripe/stripe-js";
//
import Review from "./Review";
//STRIPE 2
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
//
//
//
//
//
//
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
    }

    //
    //
  };
  /*
  
  
  */
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      {/*     Divider between products and payment details           */}
      <Divider />
      {/*     Divider between products and payment details           */}
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment methods
      </Typography>
      {/* STRIPE 3 */}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                {/*  */}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  PAY {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
