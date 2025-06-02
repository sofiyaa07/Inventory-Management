const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, "history.db");

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Export the database connection
module.exports = db;

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS history (
            name TEXT,
            model TEXT,
            quantity INTEGER,
            order_date TEXT,
            status TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'history' created or already exists.");
        }
    });
});