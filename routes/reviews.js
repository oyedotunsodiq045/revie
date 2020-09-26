const express = require('express');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect,
  authorize
} = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Review, {
      path: 'property',
      select: 'owner description phone email location'
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;