import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
//
//
const products = [
  {
    id: 1,
    name: "Ink Pen NM",
    description: "Running shoes",
    price: "$5",
    image:
      "https://images.unsplash.com/photo-1622901120958-ae569882629c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  },
  {
    id: 2,
    name: "Graphic card NM",
    description: "Apple macbook",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  },
];
/*
 */

const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
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
