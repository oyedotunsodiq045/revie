const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const downloadResource = require('../utils/downloadResource');
const {
  clearKey
} = require("../middleware/cache");

// @desc    Export all SME's and Non SME's as CSV
// @route   GET /api/v1/admin/export/users
// @access  Private
exports.exportUsers = asyncHandler(async (req, res, next) => {
  const fields = [{
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Business Name',
      value: 'businessName',
    },
    {
      label: 'Website',
      value: 'website',
    },
    {
      label: 'Address',
      value: 'address',
    },
    {
      label: 'Role',
      value: 'role',
    },
  ];

  const users = await User
    // Get all users where role is user and sme only,
    .find({
      role: {
        $in: ['user', 'sme']
      }
    })
    // sort them by their name,
    .sort({
      name: 1
    })
    // pick only their name and etc,
    .select({
      name: 1,
      email: 1,
      phone: 1,
      businessName: 1,
      website: 1,
      address: 1,
      role: 1
    })
    .cache({
      time: 10
    });

  return downloadResource(res, 'users.csv', fields, users);
});

// @desc    Export all SME's as CSV
// @route   GET /api/v1/admin/export/smes
// @access  Private
exports.exportSme = asyncHandler(async (req, res, next) => {
  const fields = [{
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Business Name',
      value: 'businessName',
    },
    {
      label: 'Website',
      value: 'website',
    },
    {
      label: 'Address',
      value: 'address',
    },
    {
      label: 'Role',
      value: 'role',
    },
  ];

  const smes = await User
    // Get all the users where role is sme,
    .find({
      role: 'sme'
    })
    // sort them by their name,
    .sort({
      name: 1
    })
    // pick only their name and etc,
    .select({
      name: 1,
      email: 1,
      phone: 1,
      businessName: 1,
      website: 1,
      address: 1,
      role: 1
    })
    .cache({
      time: 10
    });

  return downloadResource(res, 'smes.csv', fields, smes);
});

// @desc    Export all Non SME's as CSV
// @route   GET /api/v1/export/admin/nonsmes
// @access  Private
exports.exportNonSme = asyncHandler(async (req, res, next) => {
  const fields = [{
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Business Name',
      value: 'businessName',
    },
    {
      label: 'Website',
      value: 'website',
    },
    {
      label: 'Address',
      value: 'address',
    },
    {
      label: 'Role',
      value: 'role',
    },
  ];

  const users = await User
    // Get all the users where role is user,
    .find({
      role: 'user'
    })
    // sort them by their name,
    .sort({
      name: 1
    })
    // pick only their name and etc,
    .select({
      name: 1,
      email: 1,
      phone: 1,
      businessName: 1,
      website: 1,
      address: 1,
      role: 1
    })
    .cache({
      time: 10
    });

  return downloadResource(res, 'nonsmes.csv', fields, users);
});