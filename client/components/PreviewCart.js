import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFromCart, fetchCart, updateCart } from "../store/checkoutSlice";

function PreviewCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state);

  const params = useParams();

  const [editingItemId, setEditingItemId] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  const onDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  const onSave = () => {
    dispatch(updateCart({ cartId: editingItemId, size, quantity }));
    setEditingItemId(null);
    setSize("");
    setQuantity("");
  };

  useEffect(() => {
    dispatch(fetchCart(params.userId));
  }, []);

  return (
    <div>
      {checkout.map((item) => (
        <Card key={item.id} sx={{ display: "flex", alignItems: "center" }}>
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
            {editingItemId === item.id ? (
              <div>
                <TextField
                  label="Size"
                  variant="standard"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  sx={{ marginBottom: 1 }}
                />
                <TextField
                  label="Quantity"
                  variant="standard"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button variant="contained" onClick={onSave}>
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  Size: {item.size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions sx={{ alignSelf: "flex-end" }}>
            {editingItemId === item.id ? (
              <IconButton onClick={() => setEditingItemId(null)}>
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setEditingItemId(item.id);
                  setSize(item.size);
                  setQuantity(item.quantity);
                }}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default PreviewCart;
