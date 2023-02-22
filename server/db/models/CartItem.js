const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart_item", {
  productId: {
    type: Sequelize.INTEGER,
  },
  cartId: {
    type: Sequelize.INTEGER,
  },
});
