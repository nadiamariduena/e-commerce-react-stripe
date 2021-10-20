import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
// import { Link } from 'react-router-dom';

//
import FormInput from "./FormInput";
//
//
const AddressForm = () => {
  //
  //This is going to get all the methods that we need
  // to run our form
  const methods = useForm();
  //
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit={0}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
