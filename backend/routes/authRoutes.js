const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerAdmin, loginAdmin } = require('../controllers/authController');

router.post('/register', protect, registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;