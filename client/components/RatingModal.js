import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from "./Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createTheme } from "@material-ui/core/styles";

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
}));

const ModalWithRating = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Title: ${title} Comment: ${comment}`);
    //submit to the database
    handleClose();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className={classes.borderlessButton}
      >
        Open Modal
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
              value={comment}
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
          </div>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ModalWithRating;
