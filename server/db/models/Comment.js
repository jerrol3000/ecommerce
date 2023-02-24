const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("comment", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
