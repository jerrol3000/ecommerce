const router = require("express").Router();
module.exports = router;

//mount all api routes here
// router.use("/users", require("./users"));
// router.use('/users', require('./users')); // Users? Check.
// router.use('/puppies', require('./puppies')); // Puppies? Check.
// router.use('/kittens', require('./kittens')); // Kittens? Check.

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
