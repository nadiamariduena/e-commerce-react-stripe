import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

//
import useStyles from "./styles";
//
//
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  //
  //
  //
  // console.log(item);

  return (
    <>
      <Card>
        {/*  */}
        {/* This is the image of a specific product */}
        <CardMedia
          image={item.image.url}
          alt={item.name}
          className={classes.media}
        />
        {/*  Card Content*/}
        <CardContent className={classes.CardContent}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="h5">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        {/* Car actions */}
        <CardActions className={classes.CardActions}>
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              //    // - 1 , because you only want to delete 1 at the same time, not in packs of 3 for example
              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          {/* This is going to be the item that is going to 
          remove it completely from the card */}
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onRemoveFromCart(item.id)}
          >
            Removes
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItem;
