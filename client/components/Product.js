import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import anime from "animejs/lib/anime.es.js"; // import animejs library
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./css/product.css";
import RatingModal from "./RatingModal";
import { fetchAllReviews, calculateAverageRating } from "../store/reviewSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 0.9,
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  price: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    "& span": {
      fontSize: "0.8em",
    },
  },
  description: {
    color: theme.palette.text.secondary,
  },
}));

function Product({ name, image, price, description, id }) {
  const cardRef = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allReviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      scale: 1.02,
      opacity: 0.9,
      duration: 300,
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      opacity: 1,
      duration: 300,
    });
  };
  const averageRating = (id) => {
    const array = allReviews.filter((review) => review.productId === id);
    return array.length
      ? Math.floor(
          array.reduce((pre, cur) => pre + Number(cur.rating), 0) / array.length
        )
      : 0;
  };

  return (
    <div
      className={`${classes.card} product-card`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RatingModal productId={id} averageRating={averageRating(id)} />
      <Typography variant="h5" className={classes.title}>
        {name}
      </Typography>
      <NavLink to={`/products/${id}`} className="product-image">
        <img src={image} alt={name} />
      </NavLink>
      <Typography variant="h6" className={classes.price}>
        <span>${price}</span> per unit
      </Typography>
      <Typography variant="body1" className={classes.description}>
        {description}
      </Typography>
    </div>
  );
}

export default Product;
