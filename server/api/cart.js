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
  destination: (req, file, cb) => cb(null, "./tmp/image"),
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
  const { userId, productId, price, size, quantity } = req.body;
  console.log("req.file", req.file);
  try {
    const cart = await Cart.create({
      userId,
      productId,
      price,
      size,
      quantity,
      image: req.file.path,
    });
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
