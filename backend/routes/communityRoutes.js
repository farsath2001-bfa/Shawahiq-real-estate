const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createCommunity,
  getCommunities,
  getCommunityBySlug,
  updateCommunity,
  deleteCommunity,
} = require('../controllers/communityController');

router.route('/').post(protect, createCommunity).get(getCommunities);
router.route('/:slug').get(getCommunityBySlug);
router.route('/:id').put(protect, updateCommunity).delete(protect, deleteCommunity);

module.exports = router;