const express = require('express');
const {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment,
  apartmentPhotoUpload
} = require('../controllers/apartments');

const router = express.Router({
  mergeParams: true
});

router
  .route('/:id/photo')
  .put(apartmentPhotoUpload);

router
  .route('/')
  .get(getApartments)
  .post(createApartment);

router
  .route('/:id')
  .get(getApartment)
  .put(updateApartment)
  .delete(deleteApartment);

module.exports = router;