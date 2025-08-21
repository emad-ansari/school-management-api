const { Pool } = require('pg');

// Only load .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('Database host:', process.env.DATABASE_URL ? 'Configured' : 'Not configured');

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    console.error('Error details:', err);
  } else {
    console.log('Connected to PostgreSQL successfully!');
    release();
  }
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};