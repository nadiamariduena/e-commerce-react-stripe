import React, { useState, useEffect } from "react";
//
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
  //This is going to get all the methods that we need
  // to run our form
  const methods = useForm();
  //
  // ARRAY CONVERTER countries
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  console.log(countries);

  //
  //
  // ARRAY CONVERTER Subdivisions
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  //
  //
  //
  //FETCH COUNTRIES
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    // we get the keys out of the countries with the help of the: Object.keys
    setShippingCountry(Object.keys(countries)[0]);
  };
  //
  //
  // FETCH SUBDIVISIONS
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    // plural
    setShippingSubdivisions(subdivisions);
    //1 we get the keys out of the subdivisions with the help of the: Object.keys
    // individual subdivision
    setShippingSubdivision(Object.keys(subdivisions)[0]); //2 and then we get the first element [0])
  };

  //
  //
  //
  // Countries
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  //
  //Subdivisions
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

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
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*
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
