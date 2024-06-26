const mysql = require('mysql2/promise');

require('dotenv').config({ path : '/Users/kapil/Documents/n0ctech/src/.env'});

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = pool;
