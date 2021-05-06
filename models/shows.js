const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const shows = sequelize.define(
  'shows',
  {
    characters: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    release: {
      type: Sequelize.DATE,
    },
    score: {
      type: Sequelize.SMALLINT,
    },
    genre: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = shows;
