import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  CssBaseline,
  Divider,
  Button,
} from "@material-ui/core";
//
import { Link } from "react-router-dom";

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

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  //
  //----------- new state related to the token ---
  const [checkoutToken, setCheckoutToken] = useState(null);
  //
  //----------- Here we will create the TOKEN -----
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  //----------- Here we will create the TOKEN -----
  //
  //
  // All the shipping data(countries,subDivs,options) will pass through this below
  const [shippingData, setShippingData] = useState({});
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
  /*
  
  
  
  */
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // we are going to pass this function
  //  as PROPS to our AddressForm.jsx
  // Of course the function is going to accept the 'data'
  // So what are we going to do with that 'data
  const next = (data) => {
    setShippingData(data);
    //
    nextStep();
  };

  /*
  
  
  
  */
  //
  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </Typography>

          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>

        <CircularProgress />
      </div>
    );
  //
  //

  // Related to the errors, in case something
  // goes wrong with the order confirmation
  //
  //
  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">
        Back to home
      </Button>
    </>;
  }

  //
  //
  //
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
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

          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
