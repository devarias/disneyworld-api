const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'dask2c8vufft9o',
  'qgfzilhtxnpkta',
  'c6f56fb49df426c67d6d90016a1ae2174831748ad277e953cda2de94c030961c',
  {
    host: 'ec2-54-196-33-23.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 20,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  }
);

module.exports = sequelize;
