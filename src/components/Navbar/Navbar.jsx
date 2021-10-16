import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
// icons
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
//
import useStyles from "./styles";
import logo from "../../assets/commerce.png";
//
const Navbar = ({ totalItems }) => {
  //
  const classes = useStyles();
  //
  //
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Nadia Mariduena
          </Typography>
          {/* 
          
          */}
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                {/* ShoppingCart  is the icon */}
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          {/* 
        
          */}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
