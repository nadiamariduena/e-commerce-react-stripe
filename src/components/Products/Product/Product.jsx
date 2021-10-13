import React from "react";
// Import few things from material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconBotton,
} from "@material-ui/core";

//
//icon
import { AddShoppingCart } from "@material-ui/icons";
// import classes from "*.module.css";
//

const Product = ({ product }) => {
  return (
    <div>
      {/* self closing tag /> */}
      <Card className={classes.root}>
        <CardMedia className={classes.media} image="" title={product.name} />

        <CardContent>
          {/* 
          
          
          */}
          <div className={classes.CardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5">{product.price}</Typography>
            <Typography variant="h2" color="textSecondary">
              {product.description}
            </Typography>
            <CardActions disableSpacing className={classes.cardActions}>
            
            </CardActions>
          </div>

          {/* 
          
          
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
