const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Allow your deployed frontend + local dev. Add your real Vercel URL once you have it.
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // set this in Render's environment variables
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Shawahiq Real Estate API running...');
});

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/communities', require('./routes/communityRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));