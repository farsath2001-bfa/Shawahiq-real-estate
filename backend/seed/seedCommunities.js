// One-time script to seed common Dubai communities into the database.
// Run from the backend folder: node seed/seedCommunities.js
// Safe to re-run — uses upsert, so existing communities (matched by slug) won't be duplicated.

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Community = require('../models/Community');

dotenv.config();

const COMMUNITIES = [
  {
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    description: 'High-rise waterfront living with direct marina access and skyline views.',
  },
  {
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    description: 'Ultra-luxury island living with branded residences and private beach access.',
  },
  {
    name: 'Business Bay',
    slug: 'business-bay',
    description: "Dubai's central business district, minutes from Downtown and the Burj Khalifa.",
  },
  {
    name: 'Jumeirah Village Circle',
    slug: 'jumeirah-village-circle',
    description: 'Affordable, family-friendly community with strong rental yields and green spaces.',
  },
  {
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    description: 'Golf course community blending villas, apartments, and parkland in one masterplan.',
  },
  {
    name: 'Arabian Ranches',
    slug: 'arabian-ranches',
    description: 'Established villa community known for its schools, stables, and quiet streets.',
  },
  {
    name: 'Dubai Creek Harbour',
    slug: 'dubai-creek-harbour',
    description: "A new waterfront mega-development along Dubai Creek, opposite the city's historic core.",
  },
  {
    name: 'Al Furjan',
    slug: 'al-furjan',
    description: 'Growing mid-market community of villas and townhouses near Discovery Gardens.',
  },
  {
    name: 'Mohammed Bin Rashid City',
    slug: 'mohammed-bin-rashid-city',
    description: 'Centrally located luxury villas and apartments surrounding the Meydan racecourse.',
  },
  {
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    description: 'The address of the Burj Khalifa and Dubai Mall — the city\'s most premium postcode.',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    for (const community of COMMUNITIES) {
      const result = await Community.findOneAndUpdate(
        { slug: community.slug },
        community,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✔ ${result.name}`);
    }

    console.log(`\nDone — ${COMMUNITIES.length} communities seeded/updated.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();