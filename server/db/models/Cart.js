const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart", {
  image: {
    type: Sequelize.DataTypes.BLOB("long"),
    allowNull: false,
    get() {
      return this.getDataValue("image").toString("utf8"); // return the image as a string
    },
    set(value) {
      if (typeof value === "string") {
        // set the image as a string
        this.setDataValue("image", Buffer.from(value, "utf8"));
      } else {
        // set the image as a buffer
        this.setDataValue("image", value);
      }
    },
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
