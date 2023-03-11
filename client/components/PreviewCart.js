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
import { deleteFromCart } from "../store/checkoutSlice";

function PreviewCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state);

  const params = useParams();

  const onDelete = (id) => {
    dispatch(deleteFromCart(id));
  };
  const onEdit = () => {
    //update
  };

  useEffect(() => {
    dispatch(fetchCart(params.userId));
  }, []);

  return (
    <div>
      {checkout.map((item) => (
        <Card key={item.id} sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, objectFit: "contain" }}
            image={`/${item.image.split("/").splice(1).join("/")}`}
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
            <IconButton onClick={() => onDelete(item.id)}>
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
export default PreviewCart;
