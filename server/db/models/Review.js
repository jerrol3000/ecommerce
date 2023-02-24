const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("review", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});
