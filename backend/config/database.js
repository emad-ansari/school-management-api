const mysql = require("mysql2");
require("dotenv").config({
	path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
});

module.exports = connection;
