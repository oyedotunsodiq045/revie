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
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({
  mergeParams: true
});

router
  .route('/:id/photo')
  .put(apartmentPhotoUpload);

router
  .route('/')
  .get(advancedResults(Apartment, {
      path: 'property',
      select: 'owner description phone email location'
    }),
    getApartments)
  .post(createApartment);

router
  .route('/:id')
  .get(getApartment)
  .put(updateApartment)
  .delete(deleteApartment);

module.exports = router;