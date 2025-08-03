const express = require('express')
const app = express()
const cors = require('cors')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config()

// DB connection
require('./models/db')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(morgan('dev'))

// Public folder
app.use(express.static('public'))

// View engine
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine'));

// Routes
const apiRoutes = require('./routes/apiRoutes')
app.use('/', apiRoutes)

module.exports = app
