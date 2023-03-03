import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Typography, Link, Grid, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    bottom: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#b2b3ba",
    color: "#fff",
    paddingTop: "20px",
    paddingBottom: "110px",
    paddingLeft: "30px",
  },
  socialIcons: {
    marginRight: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Link href="#" color="inherit" className={classes.socialIcons}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </Link>
          <Link href="#" color="inherit" className={classes.socialIcons}>
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </Link>
          <Link href="#" color="inherit" className={classes.socialIcons}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">About Us</Typography>
          <Link href="#" color="inherit">
            Our Story
          </Link>
          <br />
          <Link href="#" color="inherit">
            Contact Us
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Support</Typography>
          <Link href="#" color="inherit">
            FAQ
          </Link>
          <br />
          <Link href="#" color="inherit">
            Shipping Policy
          </Link>
          <br />
          <Link href="#" color="inherit">
            Returns & Exchanges
          </Link>
        </Grid>
      </Grid>
      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="subtitle1" align="center">
        Sticker Farm &copy; 2023
      </Typography>
    </footer>
  );
};

export default Footer;
