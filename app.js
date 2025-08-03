const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

// MongoDB connection
require('./models/db');

// ---------------------------
// 🧩 Middleware
// ---------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// ---------------------------
// 🌐 Static Assets
// ---------------------------
app.use(express.static('public'));

// ---------------------------
// 🎨 View Engine (JSX)
// ---------------------------
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine'));

// ---------------------------
// 🔀 Routes
// ---------------------------

// Web views (SignIn, Dashboard, etc.)
const webRoutes = require('./routes/webRoutes');
app.use('/', webRoutes);

// API routes (CRUD + Auth + JSON)
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// ---------------------------
module.exports = app;
