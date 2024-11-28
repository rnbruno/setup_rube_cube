const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
