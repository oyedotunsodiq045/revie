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

// Re-route into other resource routers
router.use('/:propertyId/apartments', apartmentRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getPropertiesInRadius);

router
  .route('/:id/photo')
  .put(propertyPhotoUpload);

router
  .route('/')
  .get(advancedResults(Property, 'apartments'), getProperties)
  .post(createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;