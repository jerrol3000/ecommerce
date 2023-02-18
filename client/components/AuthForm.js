import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ formName, displayName, error }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(!!auth.id);
  useEffect(() => {
    !!auth.id && navigate("/home");
    !!auth.id && console.log("login happened");
  }, [auth, navigate]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ email, password, formName }));
  };

  return (
    <div
      style={{
        marginTop: "65px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
        backgroundColor: "#0a98f7",
      }}
    >
      <div open={open} />
      <form
        style={{
          border: "4px groove grey",
          borderRadius: "5px",
          backgroundColor: "white",
          padding: "20px",
          textAlign: "left",
        }}
        onSubmit={handleSubmit}
        name={formName}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div style={{ backgroundColor: "white", margin: "5px" }}>
        <button onClick={handleOpen}>Forgot Password?</button>
      </div>
    </div>
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
