const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Property = require('../models/Property');
const advancedResults = require('../middleware/advancedResults');

// @desc    Get all Properties
// @route   GET /api/v1/properties
// @access  Public
exports.getProperties = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single Property
// @route   GET /api/v1/properties/:id
// @access  Public
exports.getProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Create new Property
// @route   POST /api/v1/properties
// @access  Private
exports.createProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    data: property
  });
});

// @desc    Update Property
// @route   PUT /api/v1/properties/:id
// @access  Private
exports.updateProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: property
  });
});

// @desc    Delete Property
// @route   DELETE /api/v1/properties/:id
// @access  Private
exports.deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
    );
  }

  property.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get properties within radius
// @route   GET /api/v1/properties/radius/:zipcode/:distance
// @access  Private
exports.getPropertiesInRadius = asyncHandler(async (req, res, next) => {
  const {
    zipcode,
    distance
  } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius  = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const properties = await Property.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [lng, lat], radius
        ]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
});

// @desc    Upload photo for Property
// @route   DELETE /api/v1/properties/:id/photo
// @access  Private
exports.propertyPhotoUpload = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(
      new ErrorResponse(`Property not found with id of ${req.params.id}`, 404)
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
  file.name = `photo_${property._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(
        new ErrorResponse(`Please with file upload`, 500)
      );
    }

    await Property.findByIdAndUpdate(req.params.id, {
      photo: file.name
    });
  })

  res.status(200).json({
    success: true,
    data: file.name
  });
});