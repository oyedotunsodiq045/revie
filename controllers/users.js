const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const moment = require('moment');
const {
  clearKey
} = require("../middleware/cache");

// @desc    Get all Users that Registered this month
// @route   GET /api/v1/users/month
// @access  Private
exports.getThisMonthRegisteredUsers = asyncHandler(async (req, res, next) => {

  let start = moment().startOf('month'); // set to the first of this month, 12:00 am
  let end = moment().endOf('month'); // set to the last day of this month, 23:59 pm 

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users that Registered this week
// @route   GET /api/v1/users/week
// @access  Private
exports.getThisWeekRegisteredUsers = asyncHandler(async (req, res, next) => {

  let start = moment().startOf('week'); // set to the first day of this week, 12:00 am
  let end = moment().endOf('week'); // set to the last day of this week, 23:59 pm

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users that Registered today
// @route   GET /api/v1/users/today
// @access  Private
exports.getTodayRegisteredUsers = asyncHandler(async (req, res, next) => {

  // Using Mongoose
  // let start = new Date();
  // start.setHours(0,0,0,0);

  // let end = new Date();
  // end.setHours(23,59,59,999);

  // Using Moment
  let start = moment().startOf('day'); // set to 12:00 am today
  let end = moment().endOf('day'); // set to 23:59 pm today

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Brokers
// @route   GET /api/v1/users/brokers
// @access  Private
exports.getBrokers = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'sme'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Admin Users
// @route   GET /api/v1/users/admins
// @access  Private
exports.getAdmins = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    role: 'admin'
  }).cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all Users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().cache({
    time: 10
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get single User
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create new User
// @route   POST /api/v1/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  clearKey(User.collection.collectionName);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});