require('dotenv').config();


module.exports = {
  development: {
    username: process.env.DB_USERNAME || "default-username",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "your-username",
    password: "your-password",
    database: "your-test-database-name",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "your-username",
    password: "your-password",
    database: "your-production-database-name",
    host: "your-production-db-host",
    dialect: "postgres",
  },
};
