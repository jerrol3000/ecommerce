import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        const isHalf = value - 0.5 === rating && !Number.isInteger(rating);

        return (
          <span key={index} onClick={() => handleRating(value)}>
            {value <= rating ? (
              <FontAwesomeIcon icon={faStar} />
            ) : isHalf ? (
              <FontAwesomeIcon icon={faStarHalf} />
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
