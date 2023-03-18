const router = require("express").Router();
const path = require("path");
const multer = require("multer");
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("image you are trying to upload is of incorrect type");
  },
});

// matches GET requests to /api/products
router.post("/", upload.single("image"), async (req, res) => {
  const { userId, productId, price, size, quantity, name } = req.body;
  let { path } = req.file;
  try {
    const cart = await Cart.create({
      name,
      userId,
      productId,
      price,
      size,
      quantity,
      image: path,
    });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:cartId", async (req, res, next) => {
  const id = req.params.cartId;
  try {
    const itemToDelete = await Cart.findOne({
      where: { id },
    });
    if (!itemToDelete) {
      return res.status(404).send("Item not found in cart");
    }
    await itemToDelete.destroy();
    res.send(itemToDelete);
  } catch (error) {
    next(error);
  }
});

router.put("/:cartId", async (req, res, next) => {
  const id = req.params.cartId;
  const { size, quantity } = req.body;
  try {
    await Cart.update({ size, quantity }, { where: { id } });
    const updatedItem = await Cart.findByPk(id);
    res.json(updatedItem);
  } catch (error) {
    next(error);
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
    const grandTotal = cart.reduce(
      (total, cartItem) => total + cartItem.totalPrice,
      0
    );
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
