const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Apartment = require('../models/Apartment');
const Property = require('../models/Property');

// @desc    Get all Apartments
// @route   GET /api/v1/apartments
// @route   GET /api/v1/properties/:propertyId/apartments
// @access  Public
exports.getApartments = asyncHandler(async (req, res, next) => {
  if (req.params.propertyId) {
    const apartments = await Apartment.find({
      property: req.params.propertyId
    });

    return res.status(200).json({
      success: true,
      count: apartments.length,
      data: apartments
    });
  } else {
    res.status(200).json(res.advancedResults)
  }
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
  // Add user to req.body
  req.body.user = req.user.id;

  const property = Property.findById(req.body.property);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.propertyId}`, 404)
    );
  }

  // Make sure user is apartment owner
  if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to add an apartment to property ${property._id}`, 401)
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

  // Make sure user is apartment owner
  if (apartment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update an apartment to property ${apartment._id}`, 401)
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

  // Make sure user is apartment owner
  if (apartment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to delete an apartment ${apartment._id}`, 401)
    );
  }

  await apartment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload photo for Apartment
// @route   DELETE /api/v1/apartments/:id/photo
// @access  Private
exports.apartmentPhotoUpload = asyncHandler(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);

  if (!apartment) {
    return next(
      new ErrorResponse(`Apartment not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(
      new ErrorResponse(`Please uplaod a file`, 400)
    );
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please uplaod an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    );
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Please uplaod a file`, 400)
    );
  }

  // Create custom filename
  file.name = `photo_${apartment._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(
        new ErrorResponse(`Please with file upload`, 500)
      );
    }

    await Apartment.findByIdAndUpdate(req.params.id, {
      photo: file.name
    });
  })

  res.status(200).json({
    success: true,
    data: file.name
  });
});