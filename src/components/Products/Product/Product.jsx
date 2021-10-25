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
const Product = ({ product, onAddToCart }) => {
  //  styles HOOK
  const classes = useStyles();
  //
  //console.log(product);
  // //
  //  return <div>test</div>;
  //
  return (
    <>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        {/* styles HOOK 
        
        */}
        {/* img */}
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        />

        <CardContent>
          <div className={classes.cardContent}>
            {/* name */}
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            {/* price */}
            <Typography gutterBottom variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          {/*
          
          
          Description */}
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textSecondary"
          />
        </CardContent>
        {/* 
        
        CardActions  */}
        <CardActions disableSpacing className={classes.cardActions}>
          {/* ICON BUTTON ON CLICK */}
          <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
