const express = require('express');
const {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment,
  apartmentPhotoUpload
} = require('../controllers/apartments');

const Apartment = require('../models/Apartment');

const router = express.Router({
  mergeParams: true
});

const advancedResults = require('../middleware/advancedResults');
const {
  protect,
  authorize
} = require('../middleware/auth');

router
  .route('/:id/photo')
  .put(protect, authorize('broker', 'admin'), apartmentPhotoUpload);

router
  .route('/')
  .get(advancedResults(Apartment, {
      path: 'property',
      select: 'owner description phone email location'
    }),
    getApartments)
  .post(protect, authorize('broker', 'admin'), createApartment);

router
  .route('/:id')
  .get(getApartment)
  .put(protect, authorize('broker', 'admin'), updateApartment)
  .delete(protect, authorize('broker', 'admin'), deleteApartment);

module.exports = router;