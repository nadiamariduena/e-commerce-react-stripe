import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
// Here **
import useStyles from "./styles";
//
//
const products = [
  {
    id: 1,
    name: "Beauty stuff 001",
    description: "Cremes Random",
    price: "$5",
    image: "../img/photo-1580870069867-74c57ee1bb07.jpeg",
  },
  {
    id: 2,
    name: "Beauty stuff 002",
    description: "Cremes Random",
    price: "$10",
    image: "../img/photo-1608142172654-318a624fe4ec.jpeg",
  },
];
/*
 */

const Products = () => {
  //
  // Here **
  const classes = useStyles();
  //
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/*  */}
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
