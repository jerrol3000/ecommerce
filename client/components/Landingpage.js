import React, { useEffect, useRef } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import anime from "animejs";
import { Link } from "react-router-dom";

function LandingPage() {
  const containerRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    const tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 1000,
    });

    tl.add({
      targets: container.querySelector("h3"),
      opacity: [0, 1],
      translateY: [100, 0],
    })
      .add(
        {
          targets: container.querySelectorAll("button"),
          opacity: [0, 1],
          translateY: [100, 0],
          delay: anime.stagger(200),
        },
        "-=500"
      )
      .add({
        targets: container.querySelector("h3"),
        translateY: [-10, 0],
        loop: true,
        direction: "alternate",
      });

    // Add CSS animations
    container.style.position = "relative";

    const animation1 = anime({
      targets: container.querySelector(".animation1"),
      opacity: [0, 1],
      translateY: ["100%", "0%"],
      duration: 2000,
      delay: 500,
      easing: "easeInOutCirc",
      autoplay: false,
    });

    const animation2 = anime({
      targets: container.querySelector(".animation2"),
      opacity: [0, 1],
      translateY: ["-100%", "0%"],
      duration: 2000,
      delay: 1000,
      easing: "easeInOutCirc",
      autoplay: false,
    });

    container.addEventListener("mouseenter", () => {
      animation1.play();
      animation2.play();
    });

    container.addEventListener("mouseleave", () => {
      animation1.reverse();
      animation2.reverse();
    });
  }, []);

  return (
    <Container
      maxWidth="sm"
      ref={containerRef}
      sx={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1541675955960-b9c87e17883d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGxhYmVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.primary.contrastText,
        bgcolor: theme.palette.primary.main,
      }}
    >
      <div
        className="animation1"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      />
      <div
        className="animation2"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      />
      <Typography
        variant="h3"
        sx={{
          position: "relative",
          zIndex: "1",
          textAlign: "center",
          color: "white",
        }}
      >
        Welcome to Sticker Farm
      </Typography>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 2,
            position: "relative",
            zIndex: "1",
            marginTop: "20px",
          }}
        >
          Get Started
        </Button>
      </Link>
      <Link to="/learnmore" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          sx={{ position: "relative", zIndex: "1", marginTop: "20px" }}
        >
          Learn More
        </Button>
      </Link>
    </Container>
  );
}

export default LandingPage;
