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
router.post("/", upload.single("image"), async (req, res) => {
  const { price, size, quantity } = req.body;
  console.log("first", req.file);
  const image = req.file.buffer;
  try {
    const cart = await Cart.create({ price, size, quantity, image });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
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
