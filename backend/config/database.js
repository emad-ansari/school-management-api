const { Pool } = require('pg');

// Only load .env in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Create PostgreSQL connection pool for NeonDB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    console.error('Database configuration:');
    console.error('- DATABASE_URL:', process.env.DATABASE_URL ? 'configured' : 'not configured');
    console.error('- NEON_DATABASE_URL:', process.env.NEON_DATABASE_URL ? 'configured' : 'not configured');
    console.error('- Environment:', process.env.NODE_ENV || 'development');
    
    if (process.env.NODE_ENV === 'production') {
      console.error('For NeonDB deployment, make sure you have:');
      console.error('1. Created a NeonDB database at https://neon.tech');
      console.error('2. Set the DATABASE_URL environment variable in Render');
      console.error('3. The DATABASE_URL should look like: postgresql://user:password@host/database');
    }
  } else {
    console.log('✅ Connected to PostgreSQL successfully!');
    release();
  }
});

module.exports = pool;