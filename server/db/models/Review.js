const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  title: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    // allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Review;
