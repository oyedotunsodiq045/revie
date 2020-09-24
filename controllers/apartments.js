const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Apartment = require('../models/Apartment');

// @desc    Get all Apartments
// @route   GET /api/v1/apartments
// @route   GET /api/v1/properties/:propertyId/apartments
// @access  Public
exports.getApartments = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.propertyId) {
    query = Apartment.find({
      property: req.params.propertyId
    });
  } else {
    query = Apartment.find().populate({
      path: 'property',
      // select: {
      //   name: 1,
      //   description: 1
      // },
      select: 'name description'
    });
  }

  const apartments = await query;

  res.status(200).json({
    success: true,
    count: apartments.length,
    data: apartments
  });
});