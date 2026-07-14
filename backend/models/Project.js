const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
    type: { type: String, enum: ['residential', 'commercial'], default: 'residential' },
    status: { type: String, enum: ['upcoming', 'ready', 'off-plan'], default: 'off-plan' },
    priceRange: {
      min: Number,
      max: Number,
    },
    bedrooms: [String], // e.g. ["Studio", "1BR", "2BR", "3BR"]
    areaRange: {
      min: Number,
      max: Number,
    },
    images: [String],
    floorPlans: [String],
    brochurePDF: String,
    amenities: [String],
    paymentPlan: [
      {
        milestone: String, // e.g. "On Booking"
        percentage: Number, // e.g. 20
      },
    ],
    location: {
      lat: Number,
      lng: Number,
    },
    description: String,
    completionDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);