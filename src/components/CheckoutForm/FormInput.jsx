import React from "react";
//
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  //
  //
  //this control comes from the useFormContext(); dependency
  const { control } = useFormContext();
  // const isError = false;
  //
  //
  return (
    //   xs means that it will only have one item in mobile devices
    <Grid item xs={12} sm={6}>
      {/* <InputLabel>{label}</InputLabel> */}
      <Controller
        defaultValue=""
        control={control}
        name={name}
        render={({ field }) => (
          <TextField {...field} name={name} label={label} required fullWidth />
        )}
      />
    </Grid>
  );
};

export default FormInput;
