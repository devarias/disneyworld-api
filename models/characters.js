const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const characters = sequelize.define(
  'characters',
  {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    history: {
      type: Sequelize.TEXT,
    },
    shows: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
  },
  {
    timestamps: false,
  }
);
module.exports = characters;
