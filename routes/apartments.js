const express = require('express');
const {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment
} = require('../controllers/apartments');

const router = express.Router({
  mergeParams: true
});

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