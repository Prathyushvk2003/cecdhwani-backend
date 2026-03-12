const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getAllPhotos,
  upload,
  uploadPhoto,
  deletePhoto
} = require('../controllers/galleryController');

const router = express.Router();

// Public routes
router.route('/').get(getAllPhotos);

// Admin routes (Now public as requested)
router.route('/').post(upload.single('image'), uploadPhoto);
router.route('/:id').delete(deletePhoto);

module.exports = router;