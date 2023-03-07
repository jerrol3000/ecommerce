import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    height: "100%",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
    axios.get("/api/checkout").then((res) => setOrders(res.data));
    axios.get("/api/users").then((res) => setUsers(res.data));
    axios.get("/api/visits").then((res) => setVisits(res.data));
  }, []);

  const handleProductUpload = (product) => {
    axios
      .post("/api/products", product)
      .then((res) => setProducts([...products, res.data]));
  };

  const handleUserManagement = (user) => {
    // Handle user management logic here
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Products
              </Typography>
              <List>
                {products.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.name} />
                  </ListItem>
                ))}
              </List>
              <form
                className={classes.form}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleProductUpload({
                    name: event.target.name.value,
                    price: event.target.price.value,
                  });
                }}
              >
                <TextField
                  className={classes.input}
                  label="Product name"
                  name="name"
                />
                <TextField
                  className={classes.input}
                  label="Product price"
                  name="price"
                />
                <Button type="submit" variant="contained" color="primary">
                  Upload Product
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Orders
              </Typography>
              <List>
                {orders.map((order) => (
                  <ListItem key={order.id}>
                    <ListItemText
                      primary={order.customerName}
                      secondary={order.totalPrice}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Users
              </Typography>
              <List>
                {users.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemText
                      primary={user.username}
                      secondary={user.email}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                className={classes.input}
                variant="contained"
                color="primary"
                onClick={() => handleUserManagement("add")}
              >
                Add User
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUserManagement("delete")}
              >
                Delete User
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Site Visits
              </Typography>
              <Typography variant="h6">{visits} visits today</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
