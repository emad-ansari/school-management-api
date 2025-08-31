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
const allowedOrigins = [
  "https://school-management-api-eight-woad.vercel.app", 
  "http://localhost:3000",
  "http://localhost:5173", 
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Routes
app.use("/", schoolRoutes);

// Basic routes
app.get("/", (req, res) => {
  res.json({ 
    message: "School API is working!",
    database: process.env.DATABASE_URL ? "Configured" : "Not configured",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Test database connection endpoint
app.get("/db-test", async (req, res) => {
  try {
    const client = await db.pool.connect();
    client.release();
    res.json({ status: "OK", message: "Database connection successful" });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: "ERROR", 
      message: "Database connection failed",
      error: error.message 
    });
  }
});

// Only start the server if we're not on Vercel (local development)
if (process.env.NODE_ENV !== 'production') {
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

  // Graceful shutdown for local development
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    db.pool.end();
    process.exit(0);
  });
}

// Export for Vercel serverless functions
module.exports = app;