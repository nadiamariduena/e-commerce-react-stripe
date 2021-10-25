import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography } from "@material-ui/core";
//
//
import useStyles from "./styles";
//
import { commerce } from "../../../lib/commerce";
//
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
//
// Stepper 2.
const steps = ["Shipping address", "Payment details"];

//
//

const Checkout = ({ cart }) => {
  //
  //----------- new state related to the token ---
  const [checkoutToken, setCheckoutToken] = useState(null);
  //
  //----------- Here we will create the TOKEN -----
  //
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  //

  //----------- Here we will create the TOKEN -----
  //
  //
  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        } catch {}
      };

      generateToken();
    }
  }, [cart]);
  //
  //
  //
  let Confirmation = () => <div>Confirmation</div>;
  //
  //
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/*  */}

          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
