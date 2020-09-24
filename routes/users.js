const express = require('express');
const {
  getThisMonthRegisteredUsers,
  getThisWeekRegisteredUsers,
  getTodayRegisteredUsers,
  getBrokers,
  getAdmins,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();

const {
  protect
} = require('../middleware/auth');

router
  .route('/')
  .get(protect, getUsers)
  .post(protect, createUser);

router
  .route('/brokers')
  .get(protect, getBrokers);

router
  .route('/admins')
  .get(protect, getAdmins);

router
  .route('/today')
  .get(protect, getTodayRegisteredUsers);

router
  .route('/week')
  .get(protect, getThisWeekRegisteredUsers);

router
  .route('/month')
  .get(protect, getThisMonthRegisteredUsers);

router
  .route('/:id')
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;