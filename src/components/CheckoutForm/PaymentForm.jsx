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
//
import Review from "./Review";

//
//STRIPE 2
const stripePromise = loadStripe('...');
//
//
const PaymentForm = ({ checkoutToken }) => {
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
      <Elements stripe={stripePromise}> </Elements>
    </>
  );
};

export default PaymentForm;
