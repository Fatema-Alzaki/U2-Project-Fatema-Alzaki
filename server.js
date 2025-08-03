require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// DB connection
const db = require('./models/db');

db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
