import React, { useState } from "react";
import anime from "animejs";
import { styled } from "@mui/material/styles";
import { Button, Container, Typography } from "@mui/material";
import ShippingInfo from "./ShippingInfo";
import CreditCardInfo from "./CreditCardInfo";
import Confirmation from "./Confirmation";
import PreviewCart from "./PreviewCart";

const FormContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

const FormHeader = styled("div")({
  marginBottom: "2rem",
});

const FormBody = styled("div")({
  width: "100%",
});

const FormFooter = styled("div")({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const BackButton = styled(Button)({
  marginRight: "1rem",
});

const NextButton = styled(Button)({
  marginLeft: "1rem",
});

const SubmitButton = styled(Button)({
  marginLeft: "auto",
});

const PurchaseForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = (event) => {
    event.preventDefault();
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
        return <ShippingInfo />;
      case 2:
        return <CreditCardInfo />;
      case 3:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <Typography variant="h2" align="center">
          Purchase Form
        </Typography>
      </FormHeader>
      <FormBody>{renderStep()}</FormBody>
      {/* <div style={{ marginRight: "2rem" }}>
<Typography variant="h4">Preview of Items</Typography>
<PreviewCart />
</div> */}
      <FormFooter>
        {step > 1 && (
          <BackButton variant="outlined" onClick={handleBack}>
            Back
          </BackButton>
        )}
        {step < 3 && (
          <NextButton variant="contained" onClick={handleNext}>
            Next
          </NextButton>
        )}
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
