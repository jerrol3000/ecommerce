import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { setRating } from "../store/ratingSlice";

const Rating = () => {
  const rating = useSelector((state) => state.rating);
  const dispatch = useDispatch();

  const handleRating = (value) => {
    dispatch(setRating(value));
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;

        return (
          <span key={index} onClick={() => handleRating(value)}>
            {value <= rating ? (
              <FontAwesomeIcon icon={faStar} />
            ) : (
              <FontAwesomeIcon icon={farStar} />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
