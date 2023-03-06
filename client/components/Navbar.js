import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme } from "@material-ui/core/styles";
import {
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
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

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <Badge overlap="rectangular" badgeContent={1} color="secondary">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={classes.cartIcon}
              />
            </Badge>
          </IconButton>
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
                {auth.email.split("@")[0].charAt(0).toUpperCase() +
                  auth.email.split("@")[0].split("").splice(1).join("")}
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
        <MenuItem onClick={handleClose}>Shopping Cart</MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
