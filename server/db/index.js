//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");

//associations go here!
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});

Product.belongsToMany(Cart, {
  through: CartItem,
});

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem,
  },
};
