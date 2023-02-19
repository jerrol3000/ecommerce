const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// matches GET requests to /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
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

module.exports = router;
