import React, { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
//
import { commerce } from "../../lib/commerce";

//
import FormInput from "./FormInput";
//
//
const AddressForm = ({ checkoutToken }) => {
  //
  // 1 state
  // by default our shipping countries,
  // are going to be set to an EMPTY array: useState([]);
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  //

  const fetchShippingCountries = async (checkoutTokenId) => {
    const countries = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    //
    setShippingCountries(countries);

    //
    //
  };
  //
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
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            {/* ------------ */}
            {/* ------------ */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
