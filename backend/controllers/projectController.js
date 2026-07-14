const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all projects (with optional filters)
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { community, status, type, minPrice, maxPrice, bedrooms } = req.query;
    const filter = {};

    if (community) filter.community = community;
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (bedrooms) filter.bedrooms = bedrooms;
    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) filter['priceRange.max'] = { $lte: Number(maxPrice) };
    }

    const projects = await Project.find(filter).populate('community');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).populate('community');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload images/floorplans/brochure for a project
// @route   POST /api/projects/upload
const uploadProjectFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const urls = req.files.map((file) => file.path); // Cloudinary URL
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  uploadProjectFiles,
};