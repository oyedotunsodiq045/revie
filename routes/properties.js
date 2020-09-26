const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesInRadius,
  propertyPhotoUpload
} = require('../controllers/properties');

const Property = require('../models/Property');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const apartmentRouter = require('./apartments');

const router = express.Router();

const {
  protect,
  authorize
} = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:propertyId/apartments', apartmentRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getPropertiesInRadius);

router
  .route('/:id/photo')
  .put(protect, authorize('broker', 'admin'), propertyPhotoUpload);

router
  .route('/')
  .get(advancedResults(Property, 'apartments'), getProperties)
  .post(protect, authorize('broker', 'admin'), createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(protect, authorize('broker', 'admin'), updateProperty)
  .delete(protect, authorize('broker', 'admin'), deleteProperty);

module.exports = router;