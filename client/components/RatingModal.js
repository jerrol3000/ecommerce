import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, postReview, updateReview } from "../store/reviewSlice";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Alert } from "@mui/material";
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
    width: "70%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      maxWidth: "400px",
    },
  },
  closeButton: {
    position: "absolute",
    top: 1,
    right: 1,
    cursor: "pointer",
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
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  noComments: {
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  commentAuthor: {
    fontSize: theme.typography.subtitle2.fontSize,
  },
  commentTimestamp: {
    fontSize: "0.7rem",
    color: theme.palette.text.secondary,
    marginBottom: "0.5rem",
  },
  dateAndTime: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: theme.spacing(3),
    fontSize: "0.7rem",
  },
  editButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

const ModalWithRating = ({ productId, averageRating }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [editReview, setEditReview] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const { reviewsById } = useSelector((state) => state.review);
  const rating = useSelector((state) => state.rating);
  const currentUser = useSelector((state) => state.auth.id);

  useEffect(() => {
    setIsValid(Boolean(title && body && rating));
  }, [title, body, rating]);

  useEffect(() => {
    if (isValid) {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }, [isValid]);

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
  const handleEdit = (id) => {
    const reviewToEdit = reviewsById.find((review) => review.id === id);
    setEditReview(reviewToEdit);
  };
  const handleTitleChange = (event) => {
    if (editReview) {
      setEditReview({
        ...editReview,
        title: event.target.value,
      });
    } else {
      setTitle(event.target.value);
    }
  };

  const handleCommentChange = (event) => {
    if (editReview) {
      setEditReview({
        ...editReview,
        body: event.target.value,
      });
    } else {
      setBody(event.target.value);
    }
  };
  const handleEditSubmit = () => {
    if (!isValid) {
      dispatch(
        updateReview({
          productId,
          review: {
            title: editReview.title,
            body: editReview.body,
            rating,
            id: editReview.id,
          },
        })
      );
      setEditReview(null);
      setOpen(false);
    } else {
      setShowAlert(false);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      dispatch(postReview({ productId, review: { title, body, rating } }));

      handleClose();
    } else {
      setShowAlert(true);
    }
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
              .map((star, i) => (
                <span key={i}>{star}</span>
              ))}
          </span>
        ) : (
          Array(5)
            .fill(<FontAwesomeIcon icon={farStar} />)
            .map((star, i) => <span key={i}>{star}</span>)
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
            <button className={classes.closeButton} onClick={handleClose}>
              X
            </button>
            {showAlert && (
              <Alert severity="warning">
                Please enter a title, comment, and rating.
              </Alert>
            )}

            <h2 id="simple-modal-title">Rate this product</h2>
            <Rating />
            <TextField
              id="outlined-basic"
              label="Enter title"
              variant="outlined"
              className={classes.textField}
              value={editReview ? editReview.title : title}
              onChange={handleTitleChange}
              disabled={currentUser ? false : true}
            />
            <TextField
              id="outlined-multiline-flexible"
              label={
                currentUser
                  ? "Enter your review"
                  : "Please login to leave review"
              }
              multiline
              minRows={4}
              variant="outlined"
              className={classes.textField}
              value={editReview ? editReview.body : body}
              onChange={handleCommentChange}
              disabled={currentUser ? false : true}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={editReview ? handleEditSubmit : handleSubmit}
              disabled={currentUser ? false : true}
            >
              {editReview ? "Update Review" : "Submit Review"}
            </Button>
            <div className={classes.commentsBox}>
              {reviewsById.length ? (
                reviewsById.map(
                  ({ title, body, rating, id, userId, createdAt, user }) => {
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
                        <div className={classes.dateAndTime}>
                          <span className={classes.commentAuthor}>
                            {" "}
                            by {user.firstName}
                          </span>
                          <span className={classes.commentTimestamp}>
                            {" "}
                            on {createdAt}
                          </span>
                          {userId === currentUser && (
                            <button
                              className={classes.editButton}
                              onClick={() => handleEdit(id)}
                            >
                              edit
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }
                )
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
