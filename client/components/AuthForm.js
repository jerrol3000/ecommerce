import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
  Grid,
  Paper,
} from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A237E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF9800",
      contrastText: "#FFFFFF",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AuthForm = ({ formName, displayName, error }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    !!auth.id && navigate("/home");
  }, [auth, navigate]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value.toLowerCase();
    const password = evt.target.password.value;
    let firstName, lastName;
    if (formName === "signup") {
      firstName = evt.target.firstName.value;
      lastName = evt.target.lastName.value;
    }
    dispatch(authenticate({ email, password, firstName, lastName, formName }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Paper elevation={2} className={classes.paper}>
            <Typography component="h1" variant="h5">
              {displayName}
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              name={formName}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
              {formName === "signup" && (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {displayName}
              </Button>
              {error && error.response && (
                <Typography color="error" align="center">
                  {error.response.data}
                </Typography>
              )}
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {formName === "login" ? (
                  <Link href="#" variant="body2" onClick={handleOpen}>
                    Forgot Password?
                  </Link>
                ) : (
                  <Link href="#" variant="body2" onClick={handleOpen}>
                    Already have an account? Log in
                  </Link>
                )}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;

export const Login = () => {
  const error = useSelector((state) => state.auth.error);
  return <AuthForm formName="login" displayName="Login" error={error} />;
};

export const Signup = () => {
  const error = useSelector((state) => state.auth.error);
  return <AuthForm formName="signup" displayName="Sign Up" error={error} />;
};
