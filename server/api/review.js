const router = require("express").Router();
const {
  models: { User, Comment, Review },
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

// get all review for a product
router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({
      where: { productId },
      include: [{ model: Comment }],
    });
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

//get all comments on a review
router.get("/:reviewId/comment", requireToken, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const reviews = await Comment.findAll({
      where: { reviewId },
      include: [{ model: User }],
    });
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

//post review
router.post("/:productId", requireToken, async (req, res, next) => {
  try {
    const { title, body, rating } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;
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

//comment on a review
router.post("/:reviewId/comment", requireToken, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { body } = req.body;
    const userId = req.user.id;
    const comment = Comment.create({ body, reviewId, userId });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
