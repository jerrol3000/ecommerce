const Sequelize = require("sequelize");
const moment = require("moment");
const db = require("../db");

const Review = db.define("review", {
  title: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
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
  productId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("NOW()"),
    get: function () {
      return moment(this.getDataValue("createdAt")).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
    },
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("NOW()"),
    get: function () {
      return moment(this.getDataValue("updatedAt")).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
    },
  },
});

module.exports = Review;
