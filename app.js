const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

// ---------------------------
// 🧩 Middleware
// ---------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));

// ---------------------------
// 🎨 View Engine (JSX)
// ---------------------------
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine')());

// ---------------------------
// 🔀 Route Controllers
// ---------------------------
const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');

// ✅ ADD THIS
const userRoutes = require('./controllers/users/routeController');
const authRoutes = require('./controllers/auth/routeController')

// ---------------------------
// 🛣 Route Mounting
// ---------------------------
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// ✅ ADD THIS
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// ---------------------------
module.exports = app;
