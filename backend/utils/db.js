const mySql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// db connection
const pool = mySql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log("MySQL pool created");

module.exports = pool.promise();
