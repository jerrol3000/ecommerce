const router = require("express").Router();
module.exports = router;

//mount all api routes here
router.use("/users", require("./users"));
router.use("/checkout", require("./cart"));
router.use("/products", require("./product"));
router.use("/review", require("./review"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
