import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme } from "@material-ui/core/styles";
import { deleteFromCart } from "../store/checkoutSlice";
import { fetchCart } from "../store/checkoutSlice";
import {
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
  faTrashAlt,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: 50,
    paddingTop: 8,
  },
  cartIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = !!auth.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  const { checkout } = useSelector((state) => state);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (cartId) => {
    dispatch(deleteFromCart(cartId));
  };

  const handleSave = (itemId, newName, newQuantity, newPrice) => {
    // Call your API to update the item's values here
    // Or update your state with the new values

    setEditingItemId(null); // Reset the editingItemId to exit edit mode
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {" "}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <Badge
              overlap="rectangular"
              badgeContent={checkout.length}
              color="secondary"
            >
              {" "}
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={classes.cartIcon}
              />
            </Badge>
          </IconButton>
          {auth.isAdmin && (
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/admin"
            >
              Admin
            </Button>
          )}
          <Typography variant="h6" className={classes.title}>
            <Link to="/home">
              <img
                src="/logo.png"
                alt="Sticker Farm"
                className={classes.logo}
              />
            </Link>
          </Typography>
          {isLoggedIn ? (
            <div style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.title}>
                Hi,{" "}
                {auth.username.charAt(0).toUpperCase() +
                  auth.username.split("").splice(1).join("")}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={classes.menuIcon}
                />
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className={classes.menuIcon}
                />
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className={classes.menuIcon}
                />
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {checkout.length ? (
          checkout.map((item) => (
            <MenuItem key={item.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingItemId === item.id ? (
                  <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle1">Quantity</Typography>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        style={{
                          border: "none",
                          borderBottom: "1px solid gray",
                          padding: "5px",
                          marginBottom: "10px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle1">Size</Typography>
                      <input
                        type="text"
                        defaultValue={item.size}
                        style={{
                          border: "none",
                          borderBottom: "1px solid gray",
                          padding: "5px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography variant="subtitle1">
                      {item.name} ({item.size})
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      quantity: {item.quantity} price: ${item.price} USD
                    </Typography>
                  </div>
                )}

                <div>
                  {editingItemId === item.id ? (
                    <IconButton>
                      <FontAwesomeIcon icon={faSave} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setEditingItemId(item.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleDelete(item.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </div>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>Cart is empty</MenuItem>
        )}
        <MenuItem onClick={handleClose} style={{ justifyContent: "center" }}>
          {checkout.length && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`checkout/${auth.id}`}
            >
              Continue to Checkout
            </Button>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
