import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Link } from "@material-ui/core";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "24px",
  },
  link: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              We're a sticker company that loves to create unique and
              eye-catching designs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: info@stickers.com
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: (555) 555-5555
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className={classes.icon}
              />
              Facebook
            </Link>
            <br />
            <Link
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <FontAwesomeIcon
                icon={faTwitterSquare}
                className={classes.icon}
              />
              Twitter
            </Link>
            <br />
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className={classes.icon}
              />
              Instagram
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" gutterBottom>
          © 2023 Sticker Farm. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
