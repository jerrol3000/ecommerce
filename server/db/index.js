//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Products = require("./models/Products");
//associations could go here!
// User.hasMany(Song);
// Song.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Products,
  },
};
