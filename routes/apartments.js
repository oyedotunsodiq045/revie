const express = require('express');
const {
  getApartments
} = require('../controllers/apartments');

const router = express.Router({
  mergeParams: true
});

router.route('/').get(getApartments);

module.exports = router;