const router = require("express").Router();
const {
  models: { Products, User },
} = require("../db");

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token", token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// matches GET requests to /api/puppies/
router.get("/products", async (req, res, next) => {
  console.log("PRODUCTS..............");
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// matches POST requests to /api/puppies/
// router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/puppies/:puppyId
// router.put('/:puppyId', function (req, res, next) { /* etc */});
// matches DELETE requests to /api/puppies/:puppyId
// router.delete('/:puppyId', function (req, res, next) { /* etc */});
