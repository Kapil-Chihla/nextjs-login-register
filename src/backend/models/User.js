const pool = require('../db');

exports.createUser = async (user) => {
  const { username, email, date_of_birth, company_name, phone_number, password } = user;
  const [rows] = await pool.query(
    'INSERT INTO users (username, email, date_of_birth, company_name, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)',
    [username, email, date_of_birth, company_name, phone_number, password]
  );
  return rows;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
