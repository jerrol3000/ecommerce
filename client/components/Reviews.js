import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviewSlice";
import { useParams } from "react-router-dom";

function Reviews() {
  const dispatch = useDispatch();
  const params = useParams();
  const reviews = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchReviews(params.productId));
  }, []);
  return (
    <div>
      {reviews.length ? (
        reviews.map(({ title, body, rating, id }) => {
          return (
            <div key={id}>
              <h2>{rating}</h2>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          );
        })
      ) : (
        <p>This Product has not been reviewed yet, be the first to review it</p>
      )}
    </div>
  );
}

export default Reviews;
