import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, postReview } from "../store/reviewSlice";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from "./Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { resetRating } from "../store/ratingSlice";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    float: "right",
  },
  borderlessButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  reviewContainer: {
    marginTop: theme.spacing(2),
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  reviewRating: {
    marginRight: theme.spacing(1),
  },
  commentsBox: {
    width: "100%",
    overflow: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    height: "200px",
    marginTop: theme.spacing(6),
  },
  comment: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  noComments: {
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
}));

const ModalWithRating = ({ productId, averageRating }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const { reviewsById } = useSelector((state) => state.review);
  const rating = useSelector((state) => state.rating);

  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchReviews(productId));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetRating());
    setBody("");
    setTitle("");
  };

  const handleCommentChange = (event) => {
    setBody(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(postReview({ productId, review: { title, body, rating } }));
    handleClose();
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className={classes.borderlessButton}
      >
        {averageRating ? (
          <span>
            {Array(averageRating)
              .fill(<FontAwesomeIcon icon={faStar} />)
              .concat(
                Array(5 - averageRating).fill(
                  <FontAwesomeIcon icon={farStar} />
                )
              )
              .map((star, index) => (
                <span key={index}>{star}</span>
              ))}
          </span>
        ) : (
          Array(5).fill(<FontAwesomeIcon icon={farStar} />)
        )}
      </button>

      <ThemeProvider theme={theme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Rate this product</h2>
            <Rating />
            <TextField
              id="outlined-basic"
              label="Enter title"
              variant="outlined"
              className={classes.textField}
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Enter your comment"
              multiline
              minRows={4}
              variant="outlined"
              className={classes.textField}
              value={body}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <div className={classes.commentsBox}>
              {reviewsById.length ? (
                reviewsById.map(({ title, body, rating, id }) => {
                  return (
                    <div key={id}>
                      <span>
                        {Array(rating)
                          .fill(<FontAwesomeIcon icon={faStar} />)
                          .concat(
                            Array(5 - rating).fill(
                              <FontAwesomeIcon icon={farStar} />
                            )
                          )
                          .map((star, index) => (
                            <span key={index}>{star}</span>
                          ))}
                      </span>
                      <h3 className={classes.reviewHeader}>{title}</h3>
                      <p className={classes.comment}>{body}</p>
                    </div>
                  );
                })
              ) : (
                <p className={classes.noComments}>
                  This Product has not been reviewed yet, be the first to review
                  it
                </p>
              )}
            </div>
          </div>
        </Modal>
      </ThemeProvider>
    </div>
  );
};
export default ModalWithRating;
