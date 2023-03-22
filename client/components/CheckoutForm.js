import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { styled } from "@mui/material/styles";
import { fetchCart, getLocalCart } from "../store/checkoutSlice";
import { Dispatch } from "react";
import { Button, Container, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ShippingInfo from "./ShippingInfo";
import CreditCardInfo from "./CreditCardInfo";
import Confirmation from "./Confirmation";
import PreviewCart from "./PreviewCart";
import { useDispatch, useSelector } from "react-redux";

const FormContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  "@media (max-width: 600px)": {
    /* Adjust layout for small screens */
    "& .MuiTypography-h2": {
      fontSize: "0.5rem",
    },
    "& .MuiButton-root": {
      padding: "0.5rem",
    },
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
  },
  "@media (max-width: 200px)": {
    /* Adjust layout for extra small screens */
    "& .MuiTypography-h2": {
      fontSize: "0.25rem",
    },
    "& .MuiButton-root": {
      padding: "0.3rem",
      fontSize: "0.7rem",
    },
    "& .MuiTypography-body1": {
      fontSize: "0.6rem",
    },
  },
});

const FormHeader = styled("div")({
  marginBottom: "2rem",
});

const FormBody = styled("div")({
  width: "100%",
  position: "relative",
});

const FormFooter = styled("div")({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    marginTop: "1rem",
    padding: "0 1rem",
    width: "90%",
    marginBottom: "5em",
  },
});
const Preview = styled("div")({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "@media (max-width: 600px)": {
    flexDirection: "columnReverse",
    marginTop: "1rem",
    padding: "0 1rem",
    width: "90%",
  },
});

const BackButton = styled(Button)({
  position: "absolute",
  top: "50%",
  left: "1rem",
  transform: "translateY(-50%)",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    marginTop: "20rem",
    padding: "0 1rem",
    width: "5%",
  },
});

const NextButton = styled(Button)({
  position: "absolute",
  top: "50%",
  right: "1rem",
  transform: "translateY(-50%)",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    marginTop: "20rem",
    padding: "0 1rem",
    width: "5%",
  },
});

const SubmitButton = styled(Button)({
  margin: "2rem auto 0",
  display: "block",
  padding: "1.5rem 3rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  backgroundColor: "#00bcd4",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#00a0b4",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    color: "#666",
  },
});

const ProgressContainer = styled("div")({
  marginTop: "1em",
  width: "100%",
  height: "6px",
  backgroundColor: "#ddd",
});

const ProgressBar = styled("div")(({ progress }) => ({
  width: `${progress}%`,
  height: "100%",
  backgroundColor: "#00bcd4",
  transition: "width 0.5s ease",
}));

const PurchaseForm = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const { id } = useSelector((state) => state.auth);
  const { checkout } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchCart(id));
    anime({
      targets: progressRef.current,
      width: `${progress}%`,
      easing: "easeInOutQuad",
      duration: 500,
    });
  }, [progress]);
  useEffect(() => {
    dispatch(getLocalCart());
  }, []);
  const handleNext = (event) => {
    event.preventDefault();
    setProgress((prevProgress) => prevProgress + 33.33);
    anime({
      targets: ".form-step",
      translateX: -window.innerWidth,
      easing: "easeInOutQuad",
      duration: 500,
      complete: () => setStep((prevStep) => prevStep + 1),
    });
  };

  const handleBack = (event) => {
    event.preventDefault();
    setProgress((prevProgress) => prevProgress - 33.33);
    anime({
      targets: ".form-step",
      translateX: window.innerWidth,
      easing: "easeInOutQuad",
      duration: 500,
      complete: () => setStep((prevStep) => prevStep - 1),
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ShippingInfo className="form-step" animate={{ translateX: 0 }} />
        );
      case 2:
        return (
          <CreditCardInfo className="form-step" animate={{ translateX: 0 }} />
        );
      case 3:
        return (
          <Confirmation className="form-step" animate={{ translateX: 0 }} />
        );
      default:
        return null;
    }
  };

  const grandTotal = id
    ? checkout.reduce((prev, curr) => prev + curr.totalPrice, 0)
    : checkout.reduce((prev, curr) => prev + curr.total, 0);

  return (
    <FormContainer>
      <Preview>
        <PreviewCart />
        <Typography variant="h4" align="center">
          Total Price : ${grandTotal}
        </Typography>
      </Preview>

      <ProgressContainer>
        <ProgressBar progress={progress} ref={progressRef} />
      </ProgressContainer>
      <FormHeader>
        <Typography variant="h2" align="center">
          Purchase Form
        </Typography>
      </FormHeader>
      <FormBody>
        {step > 1 && (
          <BackButton variant="outlined" onClick={handleBack}>
            {<ArrowBackIos />}
          </BackButton>
        )}
        {renderStep()}
        {step < 3 && (
          <NextButton variant="contained" onClick={handleNext}>
            {<ArrowForwardIos />}
          </NextButton>
        )}
      </FormBody>
      <FormFooter>
        {step === 3 && (
          <SubmitButton variant="contained" onClick={handleNext}>
            Submit
          </SubmitButton>
        )}
      </FormFooter>
    </FormContainer>
  );
};

export default PurchaseForm;
