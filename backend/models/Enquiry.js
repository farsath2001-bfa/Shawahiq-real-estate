const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'walk-in'],
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);