const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Apartment = require('../models/Apartment');
const Property = require('../models/Property');

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
      select: 'owner description'
    });
  }

  const apartments = await query;

  res.status(200).json({
    success: true,
    count: apartments.length,
    data: apartments
  });
});

// @desc    Get single Apartment
// @route   GET /api/v1/apartments/:id
// @access  Public
exports.getApartment = asyncHandler(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id).populate({
    path: 'property',
    select: {
      owner: 1,
      description: 1
    },
  });

  if (!apartment) {
    return next(
      new ErrorResponse(`Apartment not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: apartment
  });
});

// @desc    Create new Apartment
// @route   POST /api/v1/properties/:propertyId/apartments
// @access  Private
exports.createApartment = asyncHandler(async (req, res, next) => {
  req.body.property = req.params.propertyId;

  const property = Property.findById(req.body.property);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.propertyId}`, 404)
    );
  }
  const apartment = await Apartment.create(req.body);

  res.status(201).json({
    success: true,
    data: apartment
  });
});

// @desc    Update Apartment
// @route   PUT /api/v1/apartments/:id
// @access  Private
exports.updateApartment = asyncHandler(async (req, res, next) => {
  let apartment = await Apartment.findById(req.params.id);

  if (!apartment) {
    return next(
      new ErrorResponse(`Apartment not found with id of ${req.params.id}`, 404)
    );
  }

  apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: apartment
  });
});

// @desc    Delete Apartment
// @route   DELETE /api/v1/apartments/:id
// @access  Private
exports.deleteApartment = asyncHandler(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);

  if (!apartment) {
    return next(
      new ErrorResponse(`Apartment not found with id of ${req.params.id}`, 404)
    );
  }

  await apartment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});