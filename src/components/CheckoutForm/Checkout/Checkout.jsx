import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
//
//
import useStyles from "./styles";
//

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
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  //
  //----------- new state related to the token ---
  const [checkoutToken, setCheckoutToken] = useState(null);
  //
  //----------- Here we will create the TOKEN -----
  //
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        //
        //
        console.log(token);
        setCheckoutToken(token);
        //
      } catch (error) {}
    };
    //
    //
    //
    generateToken();
    //
  }, []);
  //
  //----------- Here we will create the TOKEN -----
  //
  //
  //
  //
  //
  const Confirmation = () => <div>Confirmation</div>;
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
            {/* stepper 3. */}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/*  */}

          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
