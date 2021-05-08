const express = require('express');
const { json } = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/** Swagger Options */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      description: 'Where you can find shows and characters of Disney World',
      title: 'Disney World API',
      version: '1.0.0',
      contact: {
        email: 'devarias90@gmail.com',
      },
      host: 'https://disneyworld-api.herokuapp.com',
    },
    servers: [
      {
        url: 'https://disneyworld-api.herokuapp.com/api',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

/** Import the routes */

const loginRoutes = require('../routes/login');
const charactersRoutes = require('../routes/characters');
const showRoutes = require('../routes/shows');

const swaggerDocs = swaggerJSDoc(swaggerOptions);
/** Initialize the server */
const app = express();

/** middleWares */
app.use(cors());
app.use(json());

/** Routes */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/login', loginRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/shows', showRoutes);

module.exports = app;
