const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesInRadius
} = require('../controllers/properties');

// Include other resource routers
// const apartmentRouter = require('./apartments');

const router = express.Router();

// Re-route into other resource routers
// router.use('/:propertyId/apartments', apartmentRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getPropertiesInRadius);

router
  .route('/')
  .get(getProperties)
  .post(createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;