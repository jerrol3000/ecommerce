const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  models: { Order },
} = require("../db");

// matches GET requests to /api/products
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).send("Error uploading image");
    next(error);
  }
});

module.exports = router;
