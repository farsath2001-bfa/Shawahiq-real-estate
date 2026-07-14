const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');

router.route('/').post(createEnquiry).get(protect, getEnquiries);
router.route('/:id').put(protect, updateEnquiry).delete(protect, deleteEnquiry);

module.exports = router;