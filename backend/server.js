require("dotenv").config();

const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoute");
const db = require("./config/database.js");



if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
	console.log('Development environment - loaded .env file');
} else {
	console.log('Production environment - using Render environment variables');
}

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
	res.json({ 
		message: "School API is working!", 
		environment: process.env.NODE_ENV || 'development',
		database: process.env.DB_HOST ? 'configured' : 'not configured'
	});
});

// School routes
app.use("/", schoolRoutes);

async function startServer() {
	try {
		// Test database connection but don't crash if it fails
		db.connect((err, client, release) => {
			if (err) {
				console.error("❌ Database connection failed:", err.message);
				console.error("⚠️  Server will start but database operations will fail");
				console.error("Please configure your database connection for production");
			} else {
				console.log("✅ Connected to PostgreSQL successfully!");
				release();
			}
		});

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
			console.log(`📚 API endpoints available at http://localhost:${PORT}`);
		});

	} catch (err) {
		console.error("❌ Server startup failed:", err);
		process.exit(1);
	}
}

// Graceful shutdown
process.on('SIGINT', () => {
	console.log('\n🛑 Shutting down server gracefully...');
	process.exit(0);
});

startServer();

module.exports = app;
