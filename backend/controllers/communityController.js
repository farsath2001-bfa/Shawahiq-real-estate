const Community = require('../models/Community');
const Project = require('../models/Project');

// @desc    Create community
// @route   POST /api/communities
const createCommunity = async (req, res) => {
  try {
    const community = await Community.create(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all communities
// @route   GET /api/communities
const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single community + its projects
// @route   GET /api/communities/:slug
const getCommunityBySlug = async (req, res) => {
  try {
    const community = await Community.findOne({ slug: req.params.slug });
    if (!community) return res.status(404).json({ message: 'Community not found' });

    const projects = await Project.find({ community: community._id });
    res.json({ ...community.toObject(), projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update community
// @route   PUT /api/communities/:id
const updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json(community);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete community
// @route   DELETE /api/communities/:id
const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json({ message: 'Community deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCommunity,
  getCommunities,
  getCommunityBySlug,
  updateCommunity,
  deleteCommunity,
};