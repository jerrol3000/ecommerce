const router = require("express").Router();
const {
  models: { User, Review },
} = require("../db");

//protect routes so only authenticated users can review
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

// get all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

// get all review for a product
router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({
      where: { productId },
      include: [User],
    });
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

//post review
router.post("/:productId", requireToken, async (req, res, next) => {
  const { title, body, rating } = req.body;
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.create({
      title,
      body,
      rating,
      productId,
      userId,
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

//PUT route
router.put("/:productId", requireToken, async (req, res, next) => {
  const { productId } = req.params;
  const { title, body, rating } = req.body;
  const userId = req.user.id;
  try {
    const review = await Review.update(
      { title, body, rating },
      { where: { productId, userId } }
    );
    res.json(review);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
