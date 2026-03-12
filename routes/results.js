const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getAllResults, 
  getResultsByEvent, 
  getPublicLeaderboard,
  addResult, 
  updateResult, 
  deleteResult 
} = require('../controllers/resultController');

const router = express.Router();

// Public routes
router.route('/').get(getAllResults);
router.route('/leaderboard').get(getPublicLeaderboard);
router.route('/event/:eventId').get(getResultsByEvent);

// Admin routes
router.route('/').post(protect, addResult);
router.route('/:id').put(protect, updateResult);
router.route('/:id').delete(protect, deleteResult);

module.exports = router;