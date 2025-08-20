require("dotenv").config();

const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoute");
const connection = require("./config/database.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Routes
app.use("/", schoolRoutes);

// Basic route for testing
app.get("/", (req, res) => {
	res.json({ message: "School API is working working working" });
});

async function startServer() {
	try {
		connection.connect((err) => {
			if (err) {
				console.error("Error connecting to MySQL: " + err.stack);
				return;
			}
			console.log("Connected to MySQL as id " + connection.threadId);
		});

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});

		// gracefulShutdown(); // handle SIGINT
	} catch (err) {
		console.error("❌ Database connection failed:", err);
		process.exit(1);
	}
}

startServer();

module.exports = connection;
