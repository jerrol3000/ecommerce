import React, { useEffect } from "react";
import { fetchCart } from "../store/checkoutSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function PreviewCart({ onEdit, onDelete }) {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchCart(params.userId));
  }, []);

  return (
    <div>
      {checkout.map((item) => (
        <Card key={item.id} sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150, objectFit: "contain" }}
            image={`${window.location.host}/${item.image
              .split("/")
              .splice(1)
              .join("/")}`}
            alt="item"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.quantity}
            </Typography>
          </CardContent>
          <CardActions sx={{ alignSelf: "flex-end" }}>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
