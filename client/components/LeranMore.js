import React, { useEffect, useRef } from "react";
import { Typography, Card } from "@mui/material";
import anime from "animejs";

function LearnMore() {
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);

  useEffect(() => {
    anime({
      targets: [cardRef1.current, cardRef2.current],
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 500 }),
      easing: "easeOutSine",
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#F9FAFB", padding: "64px 16px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Learn More
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, marginRight: "32px" }} ref={cardRef1}>
            <Card sx={{ padding: "32px", borderRadius: "16px" }}>
              <Typography variant="body1" gutterBottom>
                "I was so impressed with the quality of the stickers I received
                from Sticker Farm. They were exactly what I was looking for and
                really helped me promote my business."
              </Typography>
              <Typography variant="subtitle2">
                - John Doe, Owner of XYZ Company
              </Typography>
            </Card>
          </div>
          <div style={{ flex: 1 }} ref={cardRef2}>
            <Card sx={{ padding: "32px", borderRadius: "16px" }}>
              <Typography variant="body1" gutterBottom>
                "I've ordered stickers from Sticker Farm multiple times and have
                always been thrilled with the results. The stickers are easy to
                apply and last for years."
              </Typography>
              <Typography variant="subtitle2">
                - Jane Smith, Graphic Designer
              </Typography>
            </Card>
          </div>
        </div>
        <div style={{ marginTop: "32px" }}>
          <Typography variant="body1" gutterBottom>
            Sticker Farm is a leading provider of custom stickers for businesses
            and individuals. Our high-quality stickers are made from durable
            materials and are perfect for use on vehicles, laptops, water
            bottles, and more. With our easy-to-use design tool, you can create
            your own custom stickers in minutes. We offer a wide range of sizes,
            shapes, and colors to choose from, so you can find the perfect
            sticker for your needs.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;
