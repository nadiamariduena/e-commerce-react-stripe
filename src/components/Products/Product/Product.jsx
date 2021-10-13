import React from "react";
// Import few things from material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
//icon
import { AddShoppingCart } from "@material-ui/icons";
//styles HOOK

import useStyles from "./styles";

//
//
const Product = ({ product }) => {
  //  styles HOOK
  const classes = useStyles();
  //

  //
  //
  return (
    <>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        {/* styles HOOK */}
        <CardMedia className={classes.media} image="" title={product.name} />

        <CardContent>
          <div className={classes.cardContent}>
            {/* name */}
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            {/* price */}
            <Typography gutterBottom variant="h5">
              {product.price}
            </Typography>
          </div>
          {/*
          
          
          Description */}
          <Typography variant="h2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
        {/* 
        
        CardActions  */}
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart">
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;