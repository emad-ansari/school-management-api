const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoute");
const db = require("./config/database.js");

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('Development mode - loaded .env file');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", schoolRoutes);

// Basic routes
app.get("/", (req, res) => {
  res.json({ 
    message: "School API is working!",
    database: process.env.DATABASE_URL ? "Configured" : "Not configured"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Database URL present:', !!process.env.DATABASE_URL);
  
  // Test database connection
  db.pool.connect((err, client, release) => {
    if (err) {
      console.error('DATABASE CONNECTION FAILED:');
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);
      console.error('Please check:');
      console.error('1. Your DATABASE_URL in .env file');
      console.error('2. That your Neon database is running');
      console.error('3. Your internet connection');
    } else {
      console.log('Connected to PostgreSQL successfully!');
      release();
    }
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.pool.end();
  process.exit(0);
});