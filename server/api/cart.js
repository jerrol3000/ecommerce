const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  models: { Product, Cart, User, CartItem },
} = require("../db");

// matches GET requests to /api/products
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const order = await Cart.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).send("There was an error checking out your order");
    next(error);
  }
});

router.get("/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: 1,
      },
      include: {
        model: Product,
        through: CartItem,
      },
    });

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
