const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const users = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = users;
