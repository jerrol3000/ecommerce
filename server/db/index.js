//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
//associations could go here!
// User.hasMany(Song);
// Song.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
