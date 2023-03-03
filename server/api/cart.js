const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  models: { Product, Cart, User, CartItem },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

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

router.get("/", requireToken, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findAll({
      where: { userId },
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
