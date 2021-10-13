import React from "react";
import Grid from "@material-ui/core";

//
//
const products = [
  { id: 1, name: "Shoes", description: "Running shoes" },
  { id: 2, name: "Mac book", description: "Apple macbook" },
];
/*


*/

const Products = () => {
  <main>
    <Grid container justify="center" spacing="4">
      {products.map((productItem) => (
        //   
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
        
        {/* 
        
        Every time you are looping through something in jsx
        you need to have the id

        */}
        
        
        
        </Grid>

      ))}
    </Grid>
  </main>;
};

export default Products;
