const Enquiry = require('../models/Enquiry');

// @desc    Create enquiry (public - from website form)
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enquiries (admin only)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
  try {
    const { status, source, project } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (project) filter.project = project;

    const enquiries = await Enquiry.find(filter)
      .populate('project', 'name slug')
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (admin only)
// @route   PUT /api/enquiries/:id
const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete enquiry (admin only)
// @route   DELETE /api/enquiries/:id
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
};