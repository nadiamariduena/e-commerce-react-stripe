import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
//
import CartItem from "./CartItem/CartItem";

//
//
import useStyles from "./styles";
//
//
const Cart = ({ cart }) => {
  //

  //   const isEmpty = !(cart.line_items && cart.line_items.length);
  //   //

  const classes = useStyles();
  //
  // the following two functions are called sub components
  //So if the cart is EMPTY show the following:
  const EmptyCart = () => {
    <Typography variant="subtitle1">
      You have no items in your shopping cart, start adding some!
    </Typography>;
  };
  //
  //
  //So if the cart is FILLED show the following:
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={5} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          {/* with symbol, is going to give us the amount with the dollar sign but if you set it up to euro in commercejs , it will show euro*/}
          Subtotal: {cart.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  //   useEffect(() => {
  //     console.log(cart);
  //   }, [cart]);

  //
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      {/* gutterBottom is going to give a top height to wherever you place it */}
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping Cart
      </Typography>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
