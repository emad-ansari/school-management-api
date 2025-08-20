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
// app.get("/", (req, res) => {
// 	res.json({ message: "School API is working!" });
// });

// School routes
app.use("/", schoolRoutes);

async function startServer() {
	try {
		// Test database connection
		db.getConnection((err, connection) => {
			if (err) {
				console.error("❌ Database connection failed:", err.message);
				console.error("Please check your database configuration and ensure MySQL is running");
				process.exit(1);
			}
			console.log("✅ Connected to MySQL as id " + connection.threadId);
			connection.release();
		});

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
			console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
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
