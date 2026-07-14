const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  uploadProjectFiles,
} = require('../controllers/projectController');

router.route('/').post(protect, createProject).get(getProjects);
router.post('/upload', protect, upload.array('files', 10), uploadProjectFiles);
router.route('/:slug').get(getProjectBySlug);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;