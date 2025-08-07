const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./controllers/auth/routeController')
const { auth } = require('./controllers/auth/apiController')
// const apiRoutes = require('./routes/apiRoutes');
const projectRouter = require('./controllers/projects/routeController')

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
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

// ---------------------------
// 🎨 View Engine (JSX)
// ---------------------------
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine')());

// ---------------------------
// 🔀 Route Controllers
// ---------------------------


// ✅ ADD THIS



// ---------------------------
// 🛣 Route Mounting
// ---------------------------
// app.use('/', webRoutes);

app.get('/', auth, (req, res) => {
    res.render('layouts/Layout', {
        ...res.locals.data,
        user: req.user,
        currentUrl: '/', // <- this is critical for condition
        
    })
})


// app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
/*
auth/.....
*/
app.use('/projects', projectRouter)

// ---------------------------
module.exports = app;
