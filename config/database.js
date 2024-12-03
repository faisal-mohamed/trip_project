const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: console.log
});

module.exports = sequelize;
