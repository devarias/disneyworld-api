const express = require('express');
const { json } = require('express');
const cors = require('cors');

/** Import the routes */
const loginRoutes = require('../routes/login');
const charListRoute = require('../routes/characters');

/** Initialize the server */
const app = express();

/** middleWares */
app.use(cors());
app.use(json());

/** Routes */
app.use('/api/login', loginRoutes);
app.use('/api/characters', charListRoute);

module.exports = app;
