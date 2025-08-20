const mysql = require('mysql2');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // SSL for production
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

// Get a promise-based interface
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    console.error('Please check your database configuration in .env file');
  } else {
    console.log('✅ Connected to MySQL successfully!');
    connection.release(); // Release the connection back to the pool
  }
});

// Export both pool and promisePool for flexibility
module.exports = pool;
module.exports.promise = promisePool;