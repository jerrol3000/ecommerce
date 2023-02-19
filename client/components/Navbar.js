import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./css/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = !!auth.id;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/home" className="navbar-item">
            <FontAwesomeIcon icon={faHome} className="navbar-icon" />
            <div className="navbar-brand">
              <h1 className="navbar-title">Sticker Farm</h1>
            </div>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="navbar-end">
            <p className="navbar-item">Hi, {auth.email.split("@")[0]}</p>
            <a href="#" className="navbar-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to="/login" className="navbar-item">
              <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" />
              Login
            </Link>
            <Link to="/signup" className="navbar-item">
              <FontAwesomeIcon icon={faUserPlus} className="navbar-icon" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
