const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("order", {
  image: {
    type: Sequelize.BLOB,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});
